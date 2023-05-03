import { Routes, Route, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "../widgets/layout/";
import routes from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Client from "@/pages/dashboard/Notice";
import SubAdmin from "@/pages/dashboard/Students";
import Chat from "@/pages/dashboard/Staff";
import { Profile } from "@/pages/dashboard";



import { Home } from "@/pages/dashboard";

import { useEffect } from "react";
import { SignIn, SignUp } from "@/pages/auth";

import Frontpage from "@/pages/Frontpage/Frontpage";
import Student from "@/pages/dashboard/Commity";
import Resistration from "@/pages/dashboard/Resistration";
import Grievance from "@/pages/dashboard/Grievance";

// import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  // let u_type = JSON.parse(localStorage.getItem("u_type"))
  // console.log(u_type)

  let navigate = useNavigate();
  let auth = JSON.parse(localStorage.getItem("user"));
  let u_type = JSON.parse(localStorage.getItem("u_type"));

  useEffect(() => {
    if (!auth) {
      navigate("/auth/front_page");
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {!auth ? (
        <Frontpage />
      ) : (
        <>
          <Sidenav
            routes={routes}
            brandImg={
              sidenavType === "dark" ? "/img/logo.jpeg" : "/img/logo.jpeg"
            }
          />
          <div className="p-4 xl:ml-80">
            <DashboardNavbar />
            <Configurator />
            <IconButton
              size="lg"
              color="white"
              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
              ripple={false}
              onClick={() => setOpenConfigurator(dispatch, true)}
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
              {u_type === "s" ? (
                <>
                  <Route exact path="/home" element={<Home />} />

                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/grievance" element={<Grievance />} />
                  <Route exact path="/committee" element={<Student />} />
                  <Route exact path="/notices" element={<Client />} />
                  <Route exact path="/staffs" element={<Chat />} />
                  <Route exact path="/Students" element={<SubAdmin />} />
                  <Route exact path="/Sign-up/:key" element={<SignUp />} />

                  <Route
                    exact
                    path="/resistration_request"
                    element={<Resistration />}
                  />
                </>
              ) : null}
              {u_type === "student" && (
                <>
                  <Route exact path="/grievance" element={<Grievance />} />

                  <Route exact path="/notices" element={<Client />} />
                </>
              )}
              {u_type === "staff" && (
                <>
                  <Route exact path="/grievance" element={<Student />} />

                  <Route exact path="/notices" element={<Client />} />
                </>
              )}
              {u_type === "parents" && <></>}
            </Routes>
            <div className="text-blue-gray-600">
              <Footer />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
