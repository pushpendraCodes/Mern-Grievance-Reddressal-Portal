import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiMailAddLine } from "react-icons/ri";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

import pic from "../../../public/img/favicon-32x32.png";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useEffect, useState } from "react";
import { getValue } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Notification.css";
import moment from "moment";
import { red } from "@mui/material/colors";
export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  let navigate = useNavigate();
  const logout = () => {
    localStorage.clear("user");
    navigate("/auth/sign-in");
  };
  let url = import.meta.env.VITE_API_URL;

  const [username, setusername] = useState(null);
  // console.log(email)
  const [pass, setpass] = useState(null);

  let user_id = JSON.parse(localStorage.getItem("user_id"));

  const submit = async () => {};

  let u_type = JSON.parse(localStorage.getItem("u_type"));

  const [request, setRequest] = useState([]);

  const getRequest = async () => {
    let res = await axios.get(`${url}/get/request`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });
    console.log(res, "res");
    if (res.status === 200) {
      setRequest(res.data.result);
    }
  };

  const [grievance, setgrievance] = useState([]);
  console.log(grievance, "grievance");

  useEffect(() => {
    get_grievance();
    getRequest();
  }, []);
  const get_grievance = async () => {
    let res = await axios.post(
      `${url}/get/grievance`,{sort:"pending"},

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );

    if (res.status === 200) {
      console.log(res, "res");
      setgrievance(res.data.result);
    }
  };

  let user = JSON.parse(localStorage.getItem("u_type"));

  return (
    <>
      <ToastContainer />
      <Navbar
        color={fixedNavbar ? "white" : "transparent"}
        className={`rounded-xl transition-all ${
          fixedNavbar
            ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
            : "px-0 py-1"
        }`}
        fullWidth
        blurred={fixedNavbar}
      >
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <Breadcrumbs
              className={`bg-transparent p-0 transition-all ${
                fixedNavbar ? "mt-1" : ""
              }`}
            >
              <Link to={`/${layout}`}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                >
                  {layout}
                </Typography>
              </Link>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {page}
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="flex ">
            <div className="mr-auto md:mr-4 md:w-56">
            <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >

              </Typography>
            </div>

            <Avatar alt="profile" src={pic} />

            <Link to="/auth/sign-in">
              <Button
                variant="text"
                color="blue-gray"
                className=" items-center gap-1 px-4 xl:flex"
                onClick={logout}
              >
                <ArrowRightIcon className="h-5 w-5 text-blue-gray-500" />
                Logout
              </Button>

            </Link>


            <Menu>
              {user === "s" && (
                <MenuHandler>
                  <IconButton variant="text" color="blue-gray">
                    <BellIcon className="h-8 w-12 text-blue-gray-500" />
                    <p
                      className={
                        grievance.length > 0 || request.length > 0
                          ? "circle"
                          : ""
                      }
                    ></p>
                  </IconButton>
                </MenuHandler>
              )}
              <MenuList className="w-max border-0">
                {grievance.length > 0 && (
                  <MenuItem className="flex items-center gap-3">
                    <RiMailAddLine fontSize={22} color="red" />
                    <div>
                      <Link to="/dashboard/grievance">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 font-normal"
                        >
                          <strong>You Have</strong> {grievance.length} new
                          grievnaces...
                        </Typography>
                      </Link>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" />
                        {moment(grievance[grievance.length - 1].date).fromNow()}
                      </Typography>
                    </div>
                  </MenuItem>
                )}

                {request.length > 0 && (
                  <MenuItem className="flex items-center gap-4">
                    <BsFillPersonPlusFill fontSize={22} color="blue" />

                    <div>
                      <Link to="/dashboard/resistration_request">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 font-normal"
                        >
                          <strong> You have</strong> {request.length} new
                          Registration Request..
                        </Typography>
                      </Link>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" />{" "}
                        {moment(request[request.length - 1].date).fromNow()}
                      </Typography>
                    </div>
                  </MenuItem>
                )}
                {grievance.length === 0 && request.length === 0 && (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong> You have</strong> No Notifications.
                  </Typography>
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
      </Navbar>
    </>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
