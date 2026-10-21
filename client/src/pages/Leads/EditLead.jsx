
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditLead() {
  const [readLeadById, setReadLeadById] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [assignedMemberName, setAssignedMemberName] = useState("");

  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");
  const currentUser = savedUser ? JSON.parse(savedUser) : null;
  const isAdmin = currentUser && currentUser.role === "admin";

  const { id } = useParams();
  const navigate = useNavigate();

  // Admin ke liye Team Members load karna
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

  // Lead ka existing data load karna
  useEffect(() => {
    const handleReadLeadById = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/lead/readLeadById/${id}`,
          {
            headers: {
              Authorization: token
            }
          }
        );

        const lead = response.data.data;

        setAssignedMemberName(
          lead.assignedTo?.name ?? ""
        );

        setReadLeadById({
          ...lead,
          assignedTo:
            lead.assignedTo?._id ?? lead.assignedTo ?? ""
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    if (token) {
      handleReadLeadById();
    }
  }, [id, token]);

  // Lead update karna
  const handleUpdateLead = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/lead/updateLead/${id}`,
        readLeadById,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log(response.data);
      navigate("/leads");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Update Lead
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          <form
            onSubmit={handleUpdateLead}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              className="border p-3 rounded-lg"
              value={readLeadById.businessName ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  businessName: e.target.value
                })
              }
            />

            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              className="border p-3 rounded-lg"
              value={readLeadById.contactPerson ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  contactPerson: e.target.value
                })
              }
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone / WhatsApp"
              className="border p-3 rounded-lg"
              value={readLeadById.phone ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  phone: e.target.value
                })
              }
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-3 rounded-lg"
              value={readLeadById.email ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  email: e.target.value
                })
              }
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              className="border p-3 rounded-lg"
              value={readLeadById.city ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  city: e.target.value
                })
              }
            />

            <input
              type="text"
              name="businessCategory"
              placeholder="Business Category"
              className="border p-3 rounded-lg"
              value={readLeadById.businessCategory ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  businessCategory: e.target.value
                })
              }
            />

            <input
              type="url"
              name="websiteUrl"
              placeholder="Website URL"
              className="border p-3 rounded-lg"
              value={readLeadById.websiteUrl ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  websiteUrl: e.target.value
                })
              }
            />

            <input
              type="url"
              name="socialMediaUrl"
              placeholder="Social Media URL"
              className="border p-3 rounded-lg"
              value={readLeadById.socialMediaUrl ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  socialMediaUrl: e.target.value
                })
              }
            />

            <select
              name="potentialService"
              className="border p-3 rounded-lg"
              value={readLeadById.potentialService ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  potentialService: e.target.value
                })
              }
            >
              <option value="">Potential Service</option>
              <option value="Website">Website</option>
              <option value="Shopify">Shopify</option>
              <option value="SEO">SEO</option>
              <option value="Automation">Automation</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="status"
              className="border p-3 rounded-lg"
              value={readLeadById.status ?? "New"}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  status: e.target.value
                })
              }
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Meeting">Meeting</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <input
              type="date"
              name="followUpDate"
              className="border p-3 rounded-lg"
              value={
                readLeadById.followUpDate
                  ? String(readLeadById.followUpDate).slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  followUpDate: e.target.value
                })
              }
            />

            {isAdmin ? (
              <select
                name="assignedTo"
                value={readLeadById.assignedTo ?? ""}
                required
                className="border p-3 rounded-lg"
                onChange={(e) =>
                  setReadLeadById({
                    ...readLeadById,
                    assignedTo: e.target.value
                  })
                }
              >
                <option value="">Select Team Member</option>

                {teamMembers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="border p-3 rounded-lg text-slate-600">
                Assigned To: {assignedMemberName}
              </div>
            )}

            <textarea
              name="notes"
              placeholder="Notes"
              className="border p-3 rounded-lg md:col-span-2"
              rows="4"
              value={readLeadById.notes ?? ""}
              onChange={(e) =>
                setReadLeadById({
                  ...readLeadById,
                  notes: e.target.value
                })
              }
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg md:col-span-2"
            >
              Save Changes
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditLead;
