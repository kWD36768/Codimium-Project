import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Layout() {

  return (

    <div className="min-h-screen flex bg-slate-100">


      <Sidebar />



      <div className="flex-1 flex flex-col min-h-screen">


        <Header />



        <main className="flex-1">

          <Outlet />

        </main>



        <Footer />

      </div>

    </div>

  );

}

export default Layout;