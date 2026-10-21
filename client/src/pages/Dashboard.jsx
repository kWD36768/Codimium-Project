import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";


function Dashboard() {

  const navigate = useNavigate();
const leadsData = useSelector((state) => state.leads.value) ; 


const totalLeads = leadsData.length ; 

const newLeads = leadsData.filter((lead) => lead.status === "New").length ;

const contactedLeads = leadsData.filter((lead) => lead.status === "Contacted").length ;

const meetingLeads = leadsData.filter((lead) => lead.status === "Meeting").length ;

const proposalLeads = leadsData.filter((lead) => lead.status ===  "Proposal Sent").length ;

const wonLeads = leadsData.filter((lead) => lead.status === "Won").length ;

const lostLeads = leadsData.filter((lead) => lead.status === "Lost").length ; 

const interestedLeads = leadsData.filter((lead) => lead.status === "Interested").length ; 






console.log(leadsData)

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-[#1D293D]">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Welcome back to Codimium CRM
          </p>

        </div>


        <button
          onClick={() => navigate("/add-lead")}
          className="flex items-center gap-2 bg-[#1D293D] text-white px-5 py-3 rounded-lg hover:opacity-90 transition"
        >

          <Plus className="w-5 h-5" />

          Add Lead

        </button>

      </div>


      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


        {/* Total Leads */}

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            Total Leads
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
            {totalLeads}
          </h2>

        </div>


        {/* New Leads */}

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            New Leads
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
        {newLeads}
          </h2>

        </div>


        {/* Interested */}

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            Interested
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
            {interestedLeads}
          </h2>

        </div>


        {/* Won */}

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            Won Leads
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
            {wonLeads}
          </h2>

        </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            Lost Leads
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
            {lostLeads}
          </h2>

        </div>


          <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            Meeting Leads
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
            {meetingLeads}
          </h2>

        </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            Contacted Leads
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
            {contactedLeads}
          </h2>

        </div>


          <div className="bg-white rounded-xl border border-slate-200 p-6">

          <p className="text-slate-500">
            Proposal Sent Leads
          </p>

          <h2 className="text-3xl font-bold text-[#1D293D] mt-3">
            {proposalLeads}
          </h2>

        </div>

      </div>
      


      {/* Recent Leads */}

      <div className="bg-white rounded-xl border border-slate-200 mt-8">

        <div className="flex justify-between  items-center p-8 border-b border-slate-200">
    
    <div className="bg-white rounded-xl w-full border border-slate-200 mt-8 overflow-hidden">

  
  <div className="w-full overflow-x-auto">
    <table className="w-full ">

      <thead className="bg-slate-100">
        <tr>
          <th className="p-4 text-left">Business Name</th>
          <th className="p-4 text-left">Contact</th>
          <th className="p-4 text-left">City</th>
          <th className="p-4 text-left">Service</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Assigned To</th>
        </tr>
      </thead>

      <tbody>
        {leadsData.map((lead) => (
          <tr
            key={lead._id}
            className="border-t border-slate-200 hover:bg-slate-50 transition"
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
              {lead.assignedTo.name}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>

        
        </div>




      </div>

    </div>
  );
}


export default Dashboard;