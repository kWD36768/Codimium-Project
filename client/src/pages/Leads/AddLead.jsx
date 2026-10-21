import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddLead() {
  const token = localStorage.getItem("token");

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isAdmin = currentUser?.role === "admin";

  const navigate = useNavigate();

  const [teamMembers, setTeamMembers] = useState([]);

  const [addLeadData, setAddLeadData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    businessCategory: "",
    websiteUrl: "",
    socialMediaUrl: "",
    potentialService: "",
    status: "New",
    followUpDate: "",
    assignedTo: "",
    notes: "",
  });

  // Input fields ka data update karna
  const handleChange = (e) => {
    setAddLeadData({
      ...addLeadData,
      [e.target.name]: e.target.value,
    });
  };

  // Lead add karna
  const handleAddLead = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        alert("Please login again");
        return;
      }

      const dataToSend = { ...addLeadData };

      // Admin ko Team Member select karna hoga
      if (isAdmin && !dataToSend.assignedTo) {
        alert("Please select a Team Member");
        return;
      }

      // Team Member ko backend khud assign karega
      if (!isAdmin) {
        delete dataToSend.assignedTo;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/lead/addLead`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);
      alert("Lead added successfully");
      navigate("/leads");
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(
        error.response?.data?.message || "Failed to add lead"
      );
    }
  };

  // Sirf Admin ke liye Team Members fetch karna
  useEffect(() => {
    const handleReadTeamMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/team-members`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setTeamMembers(response.data.data);
      } catch (error) {
        console.log(
          error.response?.data || error.message
        );
      }
    };

    if (token && isAdmin) {
      handleReadTeamMembers();
    }
  }, [token, isAdmin]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Add New Lead
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          <form
            onSubmit={handleAddLead}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={addLeadData.businessName}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={addLeadData.contactPerson}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone / WhatsApp"
              value={addLeadData.phone}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={addLeadData.email}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={addLeadData.city}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="businessCategory"
              placeholder="Business Category"
              value={addLeadData.businessCategory}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <input
              type="url"
              name="websiteUrl"
              placeholder="Website URL"
              value={addLeadData.websiteUrl}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <input
              type="url"
              name="socialMediaUrl"
              placeholder="Social Media URL"
              value={addLeadData.socialMediaUrl}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            <select
              name="potentialService"
              value={addLeadData.potentialService}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
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
              value={addLeadData.status}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
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
              value={addLeadData.followUpDate}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />

            {/* Assignment dropdown sirf Admin ko dikhega */}
            {isAdmin && (
              <select
                name="assignedTo"
                value={addLeadData.assignedTo}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg"
              >
                <option value="">Select Team Member</option>

                {teamMembers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            )}

            <textarea
              name="notes"
              placeholder="Notes"
              value={addLeadData.notes}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg md:col-span-2"
              rows="4"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg md:col-span-2"
            >
              Add Lead
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLead;