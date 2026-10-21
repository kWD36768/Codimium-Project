import { useSelector } from "react-redux";

function FollowUps() {

  const leadsData = useSelector(
    (state) => state.leads.value
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1D293D]">
            Follow-Ups
          </h1>

          <p className="text-slate-500 mt-1">
            Manage upcoming and due follow-ups
          </p>
        </div>


        <div className="bg-white rounded-xl border border-slate-200 shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="p-4 text-left">
                  Business Name
                </th>

                <th className="p-4 text-left">
                  Contact
                </th>

                <th className="p-4 text-left">
                  City
                </th>

                <th className="p-4 text-left">
                  Service
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Follow-Up Date
                </th>

                <th className="p-4 text-left">
                  Assigned To
                </th>
              </tr>

            </thead>


            <tbody>

              {leadsData.map((lead) => (

                <tr
                  key={lead._id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >

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
                    {lead.potentialService}
                  </td>

                  <td className="p-4">
                    {lead.status}
                  </td>

                  <td className="p-4">
                    {lead.followUpDate
                      ? new Date(
                          lead.followUpDate
                        ).toLocaleDateString()
                      : "No Date"}
                  </td>

                  <td className="p-4">
                    {lead.assignedTo.name}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default FollowUps;