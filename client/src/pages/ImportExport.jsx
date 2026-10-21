import axios from "axios";
import { useEffect, useState } from "react";

const CSV_FIELDS = [
  "businessName",
  "contactPerson",
  "phone",
  "email",
  "city",
  "businessCategory",
  "websiteUrl",
  "socialMediaUrl",
  "potentialService",
  "status",
  "followUpDate",
  "notes"
];

const EXPORT_FIELDS = [
  ...CSV_FIELDS,
  "assignedTo"
];

const escapeCSV = (value) => {
  let text = "";

  if (value !== null && value !== undefined) {
    text = String(value);
  }

  return `"${text.replace(/"/g, '""')}"`;
};

const downloadCSV = (content, fileName) => {
  const blob = new Blob(["\uFEFF" + content], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};

const parseCSVRow = (line) => {
  const values = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const character = line[i];

    if (
      character === '"' &&
      line[i + 1] === '"' &&
      insideQuotes
    ) {
      value += '"';
      i++;
    } else if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value);
  return values;
};

const normalizeHeader = (value) => {
  return String(value)
    .toLowerCase()
    .replace(/[\s_-]/g, "");
};

const getCSVValue = (row, ...possibleNames) => {
  for (const name of possibleNames) {
    const target = normalizeHeader(name);

    const foundKey = Object.keys(row).find(
      (header) => normalizeHeader(header) === target
    );

    if (foundKey !== undefined) {
      return String(row[foundKey] ?? "").trim();
    }
  }

  return "";
};

function ImportExport() {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  let currentUser = null;

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  const isAdmin = currentUser && currentUser.role === "admin";

  const [teamMembers, setTeamMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleReadTeamMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/team-members`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        setTeamMembers(response.data.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    if (token && isAdmin) {
      handleReadTeamMembers();
    }
  }, [token, isAdmin]);

  const handleExport = async () => {
    try {
      setMessage("");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/lead/readLead`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      const rows = response.data.data.map((lead) => {
        return EXPORT_FIELDS.map((field) => {
          let value = lead[field];

          if (field === "assignedTo") {
            if (value && typeof value === "object") {
              value = value._id;
            }
          }

          if (field === "followUpDate" && value) {
            value = String(value).slice(0, 10);
          }

          return escapeCSV(value);
        }).join(",");
      });

      const csv = [
        EXPORT_FIELDS.map(escapeCSV).join(","),
        ...rows
      ].join("\r\n");

      downloadCSV(csv, "codimium-leads.csv");
      setMessage("Leads CSV export successfully downloaded.");

    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.message || "Export failed."
      );
    }
  };

  const handleDownloadTemplate = () => {
    const csv = CSV_FIELDS.map(escapeCSV).join(",") + "\r\n";
    downloadCSV(csv, "codimium-leads-template.csv");
  };

  const handleImport = async () => {
    if (!file) {
      setMessage("Please select a CSV file first.");
      return;
    }

    let importAssignedTo = "";

    if (isAdmin) {
      importAssignedTo = assignedTo;
    } else if (currentUser) {
      importAssignedTo = currentUser._id;
    }

    if (!importAssignedTo) {
      setMessage("Please select a Team Member for assignment.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(
        (line) => line.trim() !== ""
      );

      if (lines.length < 2) {
        setMessage("CSV file has no lead rows.");
        return;
      }

      const headers = parseCSVRow(lines[0]).map(
        (header) => header.trim()
      );

      let importedCount = 0;
      const failedRows = [];

      for (let i = 1; i < lines.length; i++) {
        try {
          const cells = parseCSVRow(lines[i]);
          const row = {};

          headers.forEach((header, index) => {
            row[header] = cells[index] ?? "";
          });

          const leadData = {
            businessName: getCSVValue(row, "businessName"),
            contactPerson: getCSVValue(row, "contactPerson"),
            phone: getCSVValue(row, "phone"),
            email: getCSVValue(row, "email"),
            city: getCSVValue(row, "city"),
            businessCategory: getCSVValue(
              row,
              "businessCategory",
              "category"
            ),
            websiteUrl: getCSVValue(
              row,
              "websiteUrl",
              "website"
            ),
            socialMediaUrl: getCSVValue(
              row,
              "socialMediaUrl",
              "socialMedia"
            ),
            potentialService: getCSVValue(
              row,
              "potentialService"
            ),
            status: getCSVValue(row, "status"),
            followUpDate: getCSVValue(
              row,
              "followUpDate",
              "follow up date"
            ),
            notes: getCSVValue(row, "notes"),
            assignedTo: importAssignedTo
          };

          if (!leadData.status) {
            leadData.status = "New";
          }

          const missingField = CSV_FIELDS.find((field) => {
            if (field === "status") {
              return false;
            }

            return !leadData[field];
          });

          if (missingField) {
            failedRows.push(
              `Row ${i + 1}: ${missingField} is missing`
            );
            continue;
          }

          const allowedServices = [
            "Website",
            "Shopify",
            "SEO",
            "Automation",
            "Other"
          ];

          if (!allowedServices.includes(leadData.potentialService)) {
            failedRows.push(
              `Row ${i + 1}: Invalid potentialService`
            );
            continue;
          }

          const allowedStatuses = [
            "New",
            "Contacted",
            "Interested",
            "Meeting",
            "Proposal Sent",
            "Won",
            "Lost"
          ];

          if (!allowedStatuses.includes(leadData.status)) {
            failedRows.push(
              `Row ${i + 1}: Invalid status`
            );
            continue;
          }

          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/lead/addLead`,
            leadData,
            {
              headers: {
                Authorization: token
              }
            }
          );

          importedCount++;

        } catch (error) {
          failedRows.push(
            `Row ${i + 1}: ${
              error.response?.data?.message || error.message
            }`
          );
        }
      }

      let resultMessage = `Imported ${importedCount} lead(s).`;

      if (failedRows.length > 0) {
        resultMessage += " Failed rows: " + failedRows.join("; ");
      }

      setMessage(resultMessage);

    } catch (error) {
      console.log(error);
      setMessage("Could not read the selected CSV file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1D293D]">
            Import / Export
          </h1>

          <p className="text-slate-500 mt-1">
            Import leads from CSV or export your CRM data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Import */}
          <div className="bg-white rounded-xl border border-slate-200 shadow p-6">

            <h2 className="text-xl font-semibold text-[#1D293D]">
              Import Leads
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Upload a CSV file to add leads to MongoDB.
            </p>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="text-sm text-[#1D293D] underline mt-4"
            >
              Download CSV Template
            </button>

            {isAdmin && (
              <div className="mt-5">
                <label className="block text-sm font-medium mb-2">
                  Assign Imported Leads To
                </label>

                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3"
                >
                  <option value="">Select Team Member</option>

                  {teamMembers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!isAdmin && (
              <p className="mt-5 text-sm text-slate-600">
                Imported leads will be assigned to your own account.
              </p>
            )}

            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                Select CSV File
              </label>

              <input
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full border border-slate-300 rounded-lg p-3"
              />
            </div>

            <button
              type="button"
              onClick={handleImport}
              disabled={loading}
              className="mt-5 bg-[#0F172B] hover:bg-[#1D293D] disabled:opacity-60 text-white px-5 py-3 rounded-lg"
            >
              {loading ? "Importing..." : "Import Leads"}
            </button>

          </div>

          {/* Export */}
          <div className="bg-white rounded-xl border border-slate-200 shadow p-6">

            <h2 className="text-xl font-semibold text-[#1D293D]">
              Export Leads
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Download the leads available to your account as a CSV file.
            </p>

            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-5">
              <p className="text-sm text-slate-600">
                The CSV contains lead details, status, follow-up date and assigned user ID.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="mt-5 bg-[#0F172B] hover:bg-[#1D293D] text-white px-5 py-3 rounded-lg"
            >
              Export Leads
            </button>

          </div>

        </div>

        {message && (
          <div className="mt-6 bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-700">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default ImportExport;