import { Link, useParams } from "react-router-dom";

function LeadDetails() {

  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Lead Details
            </h1>

            <p className="text-slate-500 mt-1">
              Lead ID: {id}
            </p>
          </div>


          <Link
            to={`/leads/edit/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Edit Lead
          </Link>

        </div>


        <div className="bg-white rounded-xl shadow p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-slate-500">
                Business Name
              </p>

              <p className="font-semibold text-slate-800">
                ABC Company
              </p>
            </div>


            <div>
              <p className="text-sm text-slate-500">
                Contact Person
              </p>

              <p className="font-semibold text-slate-800">
                Ali
              </p>
            </div>


            <div>
              <p className="text-sm text-slate-500">
                Phone
              </p>

              <p className="font-semibold text-slate-800">
                03001234567
              </p>
            </div>


            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="font-semibold text-slate-800">
                abc@gmail.com
              </p>
            </div>


            <div>
              <p className="text-sm text-slate-500">
                City
              </p>

              <p className="font-semibold text-slate-800">
                Lahore
              </p>
            </div>


            <div>
              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="font-semibold text-slate-800">
                Interested
              </p>
            </div>


            <div>
              <p className="text-sm text-slate-500">
                Potential Service
              </p>

              <p className="font-semibold text-slate-800">
                Shopify
              </p>
            </div>


            <div>
              <p className="text-sm text-slate-500">
                Follow-up Date
              </p>

              <p className="font-semibold text-slate-800">
                20 September 2026
              </p>
            </div>


            <div className="md:col-span-2">

              <p className="text-sm text-slate-500">
                Notes
              </p>

              <p className="text-slate-800 mt-1">
                Interested in Shopify store development.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LeadDetails;