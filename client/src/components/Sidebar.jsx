import { Link } from "react-router-dom";

function Sidebar() {

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

      {/* Logo */}

      <h2 className="text-2xl font-bold mb-8">
        Codimium CRM
      </h2>


      {/* Navigation */}

      <nav className="flex flex-col gap-2">

        <Link
          to="/dashboard"
          className="px-4 py-3 rounded-lg hover:bg-slate-700"
        >
          Dashboard
        </Link>


        <Link
          to="/leads"
          className="px-4 py-3 rounded-lg hover:bg-slate-700"
        >
          Leads
        </Link>


        <Link
          to="/add-lead"
          className="px-4 py-3 rounded-lg hover:bg-slate-700"
        >
          Add Lead
        </Link>


        <Link
          to="/pipeline"
          className="px-4 py-3 rounded-lg hover:bg-slate-700"
        >
          Pipeline
        </Link>


        <Link
          to="/follow-ups"
          className="px-4 py-3 rounded-lg hover:bg-slate-700"
        >
          Follow-ups
        </Link>


        <Link
          to="/users"
          className="px-4 py-3 rounded-lg hover:bg-slate-700"
        >
          Users
        </Link>


        <Link
          to="/import-export"
          className="px-4 py-3 rounded-lg hover:bg-slate-700"
        >
          Import / Export
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;