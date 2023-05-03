import React from "react";

import { StatisticsCard } from "@/widgets/cards";

import { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
import {
  UserIcon,
  ChartBarIcon,
  UserGroupIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home() {
  let url = import.meta.env.VITE_API_URL;

  const [staffs, setStaffs] = useState([]);

  let staff_list = async () => {
    let res = await axios.get(`${url}/list/staffs`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });

    if (res.status === 200) {
      setStaffs(res.data.result);
    }
  };

  const [students, setStudents] = useState([]);
  let students_list = async () => {
    let res = await axios.get(`${url}/list/student`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });

    if (res.status === 200) {
      setStudents(res.data.result);
    }
  };
  const [grievance, setgrievance] = useState([]);
  const [grievance_reject, setgrievance_reject] = useState([]);

  const get_grievance = async () => {
    let res = await axios.post(
      `${url}/get/grievance`, {sort :"pending"},

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );

    if (res.status === 200) {

      setgrievance(res.data.result);
    }
  };
  const get_grievance_rejected = async () => {
    let res = await axios.post(
      `${url}/get/grievance`, {sort :"rejected"},

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );

    if (res.status === 200) {
      console.log(res,"home")
      setgrievance_reject(res.data.result);
    }
  };

  const [request, setRequest] = useState([]);

  const getRequest = async () => {
    let res = await axios.get(`${url}/get/request`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });

    if (res.status === 200) {
      setRequest(res.data.result);
    }
  };

  const [resolved, setResolved] = useState([]);

  const resolved_query = async () => {
    let res = await axios.get(`${url}/resolved/query`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });
    console.log(res, "resolved");
    if (res.status === 200) {
      setResolved(res.data.result);
    }
  };

  useEffect(() => {
    students_list();
    staff_list();
    get_grievance();
    getRequest();
    resolved_query();
    get_grievance_rejected()
  }, []);

  const statisticsCardsData = [
    {
      color: "blue",
      icon: UserIcon,
      title: "Total Students",
      value: students.length,
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "pink",
      icon: UserCircleIcon,
      title: "Total Staffs",
      value: staffs.length,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "green",
      icon: UserGroupIcon,
      title: "Total  Commitees",
      value: "",
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "green",
      icon: QuestionMarkCircleIcon,
      title: "Total Grievance Resolved",
      value: resolved.length,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "green",
      icon: ChartBarIcon,
      title: "Total Grievance Pending",
      value: grievance.length,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "green",
      icon: ChartBarIcon,
      title: "Total Resistration Pending",
      value: request.length,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
  ];

  const data = {
    labels: ["pending", "solved", "reject"],
    datasets: [
      {
        label: "no. of #",
        data: [grievance.length, resolved.length, grievance_reject.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data1 = {
    labels: ["student", "staff", "RequestPending"],
    datasets: [
      {
        label: "no of#",
        data: [students.length, staffs.length, request.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>
      <h2 className="my-5 text-center text-green-400">Current statics</h2>

      <div className=" mb-5 flex justify-between">
        <div className="h-52 w-1/2">
          <b className="my-2 flex justify-center">Grievance</b>
          <Pie data={data} />;
        </div>
        <div className="h-52 w-1/2">
          <b className="my-2 flex justify-center">Users</b>
          <Pie data={data1} />;
        </div>
      </div>
    </div>
  );
}

export default Home;
