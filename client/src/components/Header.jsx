import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <h1 className="text-xl font-bold text-slate-800">
        Codimium CRM
      </h1>


      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-slate-700 hover:text-red-600"
      >

        <LogOut size={20} />

        Logout

      </button>

    </header>
  );
}

export default Header;