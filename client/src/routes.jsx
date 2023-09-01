import {
  HomeIcon,

  TableCellsIcon,

  ArrowRightOnRectangleIcon,
  UserPlusIcon,

} from "@heroicons/react/24/solid";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Home, Profile, Notifications, } from "@/pages/dashboard";
import Notice from "./pages/dashboard/Notice";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { SignIn, SignUp } from "@/pages/auth";
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import Students from "./pages/dashboard/Students";
import Staff from "./pages/dashboard/Staff";
import Diversity3Icon from '@mui/icons-material/Diversity3';

import Frontpage from "./pages/Frontpage/Frontpage";



import Resistration from "./pages/dashboard/Resistration";
import Grievance from "./pages/dashboard/Grievance";
import Commity from "./pages/dashboard/Commity";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        role:["s" ]


      },
      {
        icon: <ImportantDevicesIcon {...icon} />,
        name: "Manage Grievance",
        path: "/grievance",
        element: <Grievance />,
        role:["s","student" ]


      },



      // {
      //   icon: <Diversity1Icon {...icon} />,
      //   name: " Committee",
      //   path: "/committee",
      //   element: <Commity/>,
      //   role:["s"]
      // },

      {
        icon: <NotificationsActiveIcon {...icon} />,
        name: "Notices",
        path: "/notices",
        element: <Notice />,
        role:["s","student" ]
      },

      {
        icon: <Diversity3Icon {...icon} />,
        name: "staff",
        path: "/staffs",
        element: <Staff />,
        role:[ "s"]
      },


      {
        icon: <LocalLibraryIcon {...icon} />,
        name: "students",
        path: "/Students",
        element: <Students />,
        role:["s"]
      },
      {
        icon: <GroupAddIcon {...icon} />,
        name: "Registration Request",
        path: "/resistration_request",
        element: <Resistration/> ,
        role:["s"]
      },


    ],
  },
  {
    // title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        role:[ ]
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        role:[ ]
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Front page",
        path: "/front_page",
        element: <Frontpage/>,
        role:[ ]
      },
    ],
  },
];

export default routes;
