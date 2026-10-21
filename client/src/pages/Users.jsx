import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  let currentUser = null;

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  const isAdmin = currentUser && currentUser.role === "admin";
useEffect(() => {
  const handleReadUsersAndLeads = async () => {
    try {
      const [usersResponse, leadsResponse] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_URL}/api/team-members`,
          {
            headers: {
              Authorization: token,
            },
          }
        ),

        axios.get(
          `${import.meta.env.VITE_API_URL}/api/lead/readLead`,
          {
            headers: {
              Authorization: token,
            },
          }
        ),
      ]);

      setTeamMembers(usersResponse.data.data);
      setLeads(leadsResponse.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (token && isAdmin) {
    handleReadUsersAndLeads();
  }
}, [token, isAdmin]);

  const getAssignedLeads = (userId) => {
    return leads.filter((lead) => {
      let assignedId = lead.assignedTo;

      if (assignedId && typeof assignedId === "object") {
        assignedId = assignedId._id;
      }

      return String(assignedId) === String(userId);
    });
  };

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#1D293D]">
          Admin Access Required
        </h1>

        <p className="text-slate-500 mt-2">
          Only Admin can manage team members.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1D293D]">
            Team Members
          </h1>

          <p className="text-slate-500 mt-1">
            Select a team member to view assigned leads
          </p>
        </div>

        {loading && (
          <p className="text-slate-600">
            Loading team members...
          </p>
        )}

        {!loading && teamMembers.length === 0 && (
          <p className="bg-white rounded-xl p-5 text-slate-500">
            No team members found.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {!loading && teamMembers.map((user) => (

            <button
              key={user._id}
              type="button"
              onClick={() => setSelectedMember(user)}
              className="text-left bg-white border border-slate-200 rounded-xl shadow p-5 hover:shadow-lg hover:border-[#1D293D] transition"
            >
              <h2 className="font-bold text-lg text-[#1D293D]">
                {user.name}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {user.email}
              </p>

              <p className="text-sm text-slate-700 mt-4">
                Assigned Leads: {getAssignedLeads(user._id).length}
              </p>
            </button>

          ))}

        </div>

        {!selectedMember && (
          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
            Select a team member to view their leads.
          </div>
        )}

        {selectedMember && (
          <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow overflow-hidden">

            <div className="p-5 border-b border-slate-200">
              <h2 className="text-xl font-bold text-[#1D293D]">
                {selectedMember.name}'s Assigned Leads
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {selectedMember.email}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-4 text-left">Business</th>
                    <th className="p-4 text-left">Contact</th>
                    <th className="p-4 text-left">City</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Service</th>
                  </tr>
                </thead>

                <tbody>
                  {getAssignedLeads(selectedMember._id).map((lead) => (
                    <tr key={lead._id} className="border-t border-slate-200">

                      <td className="p-4">
                        {lead.businessName}
                      </td>

                      <td className="p-4">
                        {lead.contactPerson}
                      </td>

                      <td className="p-4">
                        {lead.city}
                      </td>

                      <td className="p-4">
                        {lead.status}
                      </td>

                      <td className="p-4">
                        {lead.potentialService}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {getAssignedLeads(selectedMember._id).length === 0 && (
              <p className="p-5 text-slate-500">
                No leads assigned to this member.
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Users;