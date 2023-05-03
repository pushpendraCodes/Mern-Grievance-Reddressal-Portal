import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import Add_Staff_modal from "./Add_Staff_modal";
import { useNavigate } from "react-router-dom";
import Staff_List from "./Staff_List";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import TablePagination from "@mui/material/TablePagination";
const Staff = () => {
  let navigate = useNavigate();
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
  const [staffs, setStaffs] = useState([]);

  let mapReverse2 = [...staffs].reverse().map((element) => {
    return element;
  });
  let staff_list = async () => {
    setOpen(true);
    let res = await axios.get(`${url}/list/staffs`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    });

    if (res.status === 200) {
      setOpen(false);

      setStaffs(res.data.result);
    }
    setOpen(false);
  };
  useEffect(() => {
    staff_list();
  }, []);

  const delete_staff = async (id) => {
    console.log(id, "iden");
    setOpen(true);
    if (window.confirm("are u sure")) {
      let res = await axios.delete(`${url}/remove/staff/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      });

      if (res.status === 200) {
        staff_list();
        toast.success("success", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setOpen(false);
      toast.error(res.data.msg, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      staff_list();
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
      setStaffs(map)
    }else{
      staff_list()
    }

  },[search])

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer />


      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-2">
          <Typography variant="h6" color="white">
            Staffs
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
              navigate("/auth/sign-up");
            }}
          >
            Add Staff
          </button>
        </CardHeader>

        <div className="mx-4 my-4 mr-auto  md:mr-4 md:w-56">
          <Input
          onChange={(e)=>{setSearch(e.target.value)}}
           label="Type here" />
        </div>

        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["S.no", "Name", "Designation", "contact", "Actions"].map(
                  (el) => (
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
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {staffs.length > 0
                ? mapReverse2
                .slice(pg * rpg, pg *
                            rpg + rpg)
                    .reverse()
                    .map((data, i) => {
                      console.log(i);

                      return (
                        <Staff_List
                          index={i}
                          data={data}
                          delete_staff={delete_staff}
                          // View_request={View_request}
                        />
                      );
                    })
                : ""}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={staffs.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

    </div>
  );
};

export default Staff;
