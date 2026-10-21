import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { leadData } from "../../../redux/leadSlice";
function Leads() {
const leads = useSelector((state) => state.leads.value);

  const [checkedLeads , setCheckedLeads] = useState([]);

  const [ifAllChecked , setIfAllChecked] = useState(false); 

  const [search , setSearch] = useState("") ;


 const dispatch = useDispatch();
 
  const token = localStorage.getItem("token");
  
 const handleReadLead = useCallback(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/lead/readLead` ,
      {
        headers : {
          Authorization :token
        }
      }
    );

    console.log(response);

    dispatch(leadData(response.data.data));

  } catch (error) {
    console.log(error);
  }
}, [dispatch, token]);


useEffect(() => {

    handleReadLead();

}, [handleReadLead]);

  const handleCheckedLeads = (e) =>{
    if(e.target.checked){
      setCheckedLeads([...checkedLeads , e.target.value])
    }
    else{
      setCheckedLeads(checkedLeads.filter((leadid) => leadid !== e.target.value))
    }
  }

  const handleAllCheckedLead = (e) =>{
    if(e.target.checked){
      setCheckedLeads(leads.map((leadid) => leadid._id))
    }
    else{
      setCheckedLeads([])
    }
  }

useEffect(() => {
  const checkAll = () => {
    setIfAllChecked(leads.length !== 0 && leads.length === checkedLeads.length );
  };

  checkAll();
}, [leads, checkedLeads]);

const handleDeleteLead = async (_id) =>{
  try{
const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/lead/deleteLead/${_id}` , 
  {
    headers : {
      Authorization : token
    }
  }

)

console.log(response)
  handleReadLead();

  }


  catch(error){
    console.log(error)
  }
  
}

const handleDeleteMany = async () =>{
  try{
    const response =  await axios.delete(`${import.meta.env.VITE_API_URL}/api/lead/deleteMany` , 
      {data :  {ids : checkedLeads} ,
          headers : {
        Authorization : token
      }} ,
    
   
     )

    console.log(response)
     handleReadLead();
  }

  catch(error){
    console.log(error)
  }
}

const handleSearchLead = async (e) =>{
  try{
    if(e.target.value){
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/lead/searchLead/${e.target.value}` , {
      headers : {
        Authorization : token
      }
    })

    console.log(response)

    dispatch(leadData(response.data.data));


    }

    else{
      handleReadLead();
    }
  }

  catch(error){
    console.log(error)
  }
}

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Leads
            </h1>

            <p className="text-slate-500 mt-1">
              Manage your leads
            </p>

          </div>


          <Link
            to="/add-lead"
            className="bg-[#0F172B] hover:bg-[#1D293D] text-white px-5 py-3 rounded-lg"
          >
            + Add Lead
          </Link>

        </div>


        {/* Select All + Delete Selected */}

        <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <input
            checked = {ifAllChecked}
             onChange = {handleAllCheckedLead}
              type="checkbox"
              className="w-4 h-4"
            />

            <span className="text-slate-700">
              Select All
            </span>

          </div>




          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      onClick= {handleDeleteMany}    >
            Delete Selected
          </button>

        </div>
<input

  type="text"
  placeholder="Search by business, city, status or team member"
  value={search}
  onChange={(e) => {setSearch(e.target.value) ; handleSearchLead(e)}}
  className="bg-white rounded-xl shadow w-full p-4 mb-4 flex items-center justify-between"
/>

        {/* Table */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Select
                </th>

                <th className="p-4 text-left">
                  Business
                </th>

                <th className="p-4 text-left">
                  Contact
                </th>

                <th className="p-4 text-left">
                  City
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                 <th className="p-4 text-left">
                  Assigned To
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {/* Dynamic Leads */}

              {leads.map((lead) => (

                <tr key={lead._id} className="border-t">

                  {/* Select */}

                  <td className="p-4">

                    <input
                      type="checkbox"
                      value = {lead._id}
                       checked={checkedLeads.includes(lead._id)}
                      className="w-4 h-4"
                      onChange = {handleCheckedLeads}

                    />

                  </td>


                  {/* Business */}

                  <td className="p-4">
                    {lead.businessName}
                  </td>


                  {/* Contact */}

                  <td className="p-4">
                    {lead.contactPerson}
                  </td>


                  {/* City */}

                  <td className="p-4">
                    {lead.city}
                  </td>


                  {/* Status */}

                  <td className="p-4">
                    {lead.status}
                  </td>

                  {/* Assigned Team Member */}
                  <td className="p-4">
                    {lead.assignedTo.name}
                  </td>


                  {/* Actions */}

                 <td className="p-4 flex gap-2">

  {/* Edit */}

  <Link
    to={`/edit-lead/${lead._id}`}
      className="bg-[#0F172B] hover:bg-[#1D293D] text-white px-3 py-2 rounded-lg"
  >
    Edit
  </Link>


  {/* Delete */}

  <button
    onClick={() => handleDeleteLead(lead._id)}
    className="bg-red-600 ml-4 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>

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

export default Leads;