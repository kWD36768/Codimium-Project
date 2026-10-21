import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Layout() {

  return (

    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}

      <Sidebar />


      {/* Right Side */}

      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header */}

        <Header />


        {/* Page */}

        <main className="flex-1">

          <Outlet />

        </main>


        {/* Footer */}

        <Footer />

      </div>

    </div>

  );

}

export default Layout;