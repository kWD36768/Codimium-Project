import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Leads from "./pages/Leads/Leads";
import AddLead from "./pages/Leads/AddLead";
import EditLead from "./pages/Leads/EditLead";
import LeadDetails from "./pages/Leads/LeadDetails";

import Pipeline from "./pages/pipeline";
import FollowUps from "./pages/FollowUps";
import Users from "./pages/Users";
import ImportExport from "./pages/ImportExport";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />



        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/leads"
              element={<Leads />}
            />

            <Route
              path="/add-lead"
              element={<AddLead />}
            />

            <Route
              path="/edit-lead/:id"
              element={<EditLead />}
            />

            <Route
              path="/lead/:id"
              element={<LeadDetails />}
            />

            <Route
              path="/pipeline"
              element={<Pipeline />}
            />

            <Route
              path="/follow-ups"
              element={<FollowUps />}
            />

            <Route
              path="/users"
              element={<Users />}
            />

            <Route
              path="/import-export"
              element={<ImportExport />}
            />

          </Route>

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;