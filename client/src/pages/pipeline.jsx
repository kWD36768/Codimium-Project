import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leadData } from "../../redux/leadSlice";

function Pipeline() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const leadsData = useSelector(
    (state) => state.leads.value
  );

  // Login user ki leads fetch karna
  useEffect(() => {
    const handleReadLeads = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/lead/readLead`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        dispatch(leadData(response.data.data));
      } catch (error) {
        console.log(
          error.response?.data || error.message
        );
      }
    };

    if (token) {
      handleReadLeads();
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1D293D]">
            Sales Pipeline
          </h1>

          <p className="text-slate-500 mt-1">
            Track your leads through the sales process
          </p>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-5">

          {leadsData.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No leads found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {leadsData.map((lead) => (
                <div
                  key={lead._id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition duration-200"
                >
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <h2 className="font-bold text-lg text-[#1D293D]">
                      {lead.businessName}
                    </h2>

                    <span className="bg-[#1D293D] text-white text-xs font-medium px-3 py-1 rounded-full">
                      {lead.status}
                    </span>
                  </div>

                  <div className="space-y-2">

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-[#1D293D]">
                        Contact:
                      </span>{" "}
                      {lead.contactPerson}
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-[#1D293D]">
                        City:
                      </span>{" "}
                      {lead.city}
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-[#1D293D]">
                        Service:
                      </span>{" "}
                      {lead.potentialService}
                    </p>

                    <p className="text-sm text-slate-600">
                      <span className="font-medium text-[#1D293D]">
                        Assigned:
                      </span>{" "}
                      {lead.assignedTo?.name || "Not Assigned"}
                    </p>

                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 break-all">
                      Lead ID: {lead._id}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 6ad07c2a309f4f6a935178c4

export default Pipeline;