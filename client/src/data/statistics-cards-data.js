import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";


// const [admin,setadmin ]=useState()
// const admins = async ()=>{
//   let res = await axios.get("https://mern-react-admin.onrender.com/list/admin")
//    console.log(res)
//   setadmin(res.data.length)

// }
// const [subadmin,setsubadmin ]=useState()
// const sub_admins = async ()=>{
//   let res = await axios.get("https://mern-react-admin.onrender.com/list/subadmin")
//    console.log(res)
//   setsubadmin(res.data.length)

// }
// const [client,setclient]=useState()
// const Client = async ()=>{
//   let res = await axios.get("https://mern-react-admin.onrender.com/list/client")
//    console.log(res)
//   setclient(res.data.length)

// }

// useEffect(()=>{
//   admins();
//   sub_admins()
//   Client()
// })

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Total Admins",
    value: "20k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Total S-Admins",
    value: "20k",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Total  Clients",
    value: "20k",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Sales",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
