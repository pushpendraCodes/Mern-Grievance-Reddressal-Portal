import React, { useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


import pic from "../dashboard/notfound.jpg";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { Context } from "@/Context1/User_context";
import Student_list from "./Student_list";

import { ToastContainer, toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

const Students = () => {
  let url = import.meta.env.VITE_API_URL;

  const [open, setOpen] = React.useState(false);

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
      setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
      setrpg(parseInt(event.target.value, 10));
      setpg(0);
  }

  let Navigate = useNavigate();

  const { loading, setloading, error, seterror, resolved, setresolved } =
    useContext(Context);
  const [showPerPage, setShowPerPage] = useState(5);

  const [pagination, setPagination] = useState({
    start: 0,
    end: 5,
  });
  const { start, end } = pagination;

  const paginationChange = (Start, End) => {
    setPagination({ start: Start, end: End });
  };

  const [students, setStudents] = useState([]);

  let mapReverse2 = [...students].reverse().map((element) => {
    return element;
  });
  let students_list = async () => {
    setOpen(true)
    let res = await axios.get(`${url}/list/student`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });

    if (res.status === 200) {
      setOpen(false)
      setStudents(res.data.result);
    }
  };
  useEffect(() => {
    students_list();
  }, []);

  const remove_student = async (id) => {
    setOpen(true)
    if (window.confirm("are you sure")) {
      let res = await axios.delete(`${url}/remove/student/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      });
      if (res.status === 200) {
        setOpen(false)
        toast.success("🦄 user has been deleted!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        students_list();
      }
    } else {
      setOpen(false)
      students_list();
    }
  };
  const [search ,setSearch]=useState("")




  useEffect(()=>{

     let map = mapReverse2.filter(
      person => {
        return (
          person
          .name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
          person
          .email
          .toLowerCase()
          .includes(search.toLowerCase())
        );
      }
    );


    if(search){
      setStudents(map)
    }else{
      students_list()
    }

  },[search])
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer />

      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-2">
          <Typography variant="h6" color="white">
            Students Table
          </Typography>

          <button
            style={{
              width: "115px",
              float: "right",
              backgroundColor: "#e53935",
            }}
            type="button"
            className="
  rounded
  bg-yellow-600 px-6
  py-2.5
  text-xs
  font-medium
  uppercase
  leading-tight
  text-white
  shadow-md
  transition duration-150
  ease-in-out hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700
  focus:shadow-lg focus:outline-none
  focus:ring-0
  active:bg-yellow-800
  active:shadow-lg"
            onClick={() => {
              Navigate("/auth/sign-up");
            }}
          >
            Add Students
          </button>
        </CardHeader>

        <div className="mx-4 my-4 mr-auto  md:mr-4 md:w-56">
          <Input
            label="Type here"

            onChange={(e)=>{setSearch(e.target.value)}}

          />
        </div>


        <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>


        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["S.no", "Name", "Class", "Contact", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {students ? (
                mapReverse2
                .slice(pg * rpg, pg *
                            rpg + rpg)
                  .map((data, key) => {
                    const className = `py-3 px-5 ${
                      key === mapReverse2.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <Student_list
                        index={key}
                        data={data}
                        className={className}
                        remove_student={remove_student}

                      />
                    );
                  })
              ) : (
                <>
                  <figure style={{ width: "500px" }}>
                    <img
                      style={{ width: "150px", float: "right" }}
                      src={pic}
                      alt=""
                    />
                  </figure>
                </>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={students.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
    </div>
  );
};

export default Students;
