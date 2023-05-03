import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useState } from "react";

import "react-phone-input-2/lib/style.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pic from "../../../public/img/newBlink.gif";

import TablePagination from "@mui/material/TablePagination";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillDelete } from "react-icons/ai";

const Notice = () => {
  let url = import.meta.env.VITE_API_URL;

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  const [user, setuser] = React.useState("");
  const [sub, setsub] = React.useState("");
  const [notice, setnotice] = React.useState("");
  const [files, setfiles] = React.useState([]);

  function onfileChange(e) {
    setfiles([...e.target.files]);
  }
  const file_list = files ? [...files] : [];

  const [open, setOpen] = React.useState(false);

  const onsubmit = async (event) => {
    setOpen(true);
    event.preventDefault();

    if (user && sub && files) {
      var formData = new FormData();
      formData.append("user", user);
      formData.append("sub", sub);
      // formData.append("notice", notice);

      for (var i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      let res = await axios.post(`${url}/create/notice`, formData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")),
          "Content-Type": "application/pdf,image/*",
        },
      });

      if (res.status === 200) {
        setOpen(false);
        setuser("");
        setsub("");
        setnotice("");
        setfiles("");
        Getnotices();
        toast.success("succefully notices created", {
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
      toast.error(res.data, {
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
      setOpen(false);
      toast.error("all feilds required", {
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
  };
  const [notices, setnotices] = useState([]);

  let mapReverse2 = [...notices].reverse().map((element) => {
    return element;
  });
  const Getnotices = async () => {
    setOpen(true);
    let res = await axios.get(
      `${url}/get/notice`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );
    if (res.status === 200) {
      setnotices(res.data.result);
      setOpen(false);
      console.log(res, "notices");
    }
    setOpen(false);
  };
  useEffect(() => {
    Getnotices();
  }, []);

  const delete_notice = async (id) => {
    if (window.confirm("Are You Sure?")) {
      setOpen(true);
      let res = await axios.delete(
        `${url}/remove/notice/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("user")),
          },
        }
      );
      if (res.status === 200) {
        setOpen(false);

        Getnotices();
        toast.success("successfully Deleted", {
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
      }
    } else {
      Getnotices();
    }
  };

  return (
    <div className=" mb-8 flex flex-col gap-12">
      <ToastContainer />

      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      {JSON.parse(localStorage.getItem("u_type")) === "s" && (
        <>
          <Box
            className="p-2"
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={sub}
              onChange={(e) => {
                setsub(e.target.value);
              }}
              id="standard-basic"
              label="Subject"
              variant="standard"
            />

            <FormControl className="" variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Regarding
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={user}
                onChange={(e) => {
                  setuser(e.target.value);
                }}
                label="Regarding"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="staffs">Staffs</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>

            <form class="my-3 flex items-center space-x-6">
              <div class="shrink-0">
                <UploadFileIcon />
              </div>
              <label class="block">
                <span class="sr-only">Choose file </span>
                <input
                  accept="application/image/pdf/*"
                  type="file"
                  class="text-slate-500 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100
      block w-full text-sm
      file:mr-4 file:rounded-full
      file:border-0 file:py-2
      file:px-4 file:text-sm
      file:font-semibold
    "
                  onChange={onfileChange}
                />
              </label>
              <span></span>

            </form>
            <ul>
              {file_list.map((file, i) => (
                <li key={i}>
                  {i + 1} -{file.name} - {file.type}
                </li>
              ))}
            </ul>


          </Box>
          <button  className="bg-blue-gray-500 my-3 text-brown-50 rounded-md p-1 lg:w-20 sm:w-10"  onClick={onsubmit} >Submit</button>
        </>
      )}

      <Typography className="text-md bold my-2 text-blue-700">
        Notices history-
      </Typography>
      {mapReverse2 ? (
        mapReverse2.slice(pg * rpg, pg * rpg + rpg).map((item, i) => {
          const { date, notice_no, subject, _id, file } = item;
          return (
            <ul class="max-w-xl divide-y divide-gray-200 dark:divide-gray-700">
              <li class="pb-3 sm:pb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">{/* <b>{i + 1}.</b> */}</div>
                  <div class="min-w-0 flex-1">
                    <p> #{notice_no}</p>
                    <p class="truncate text-sm text-gray-800 dark:text-gray-400">
                      <b>Published on</b>: {date}
                    </p>
                    <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
                      <a
                        pdf
                        className="text-red-300"
                        href={`${url}/${file[0]}`}
                        target="blank"
                      >
                        {subject}
                      </a>

                      {i == 0 && <img src={pic} alt="" />}
                    </p>
                  </div>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {JSON.parse(localStorage.getItem("u_type")) === "s" && (
                      <AiFillDelete
                        onClick={() => {
                          delete_notice(_id);
                        }}
                        color="red"
                        className="cursor-pointer text-red-400"
                      />
                    )}
                  </div>
                </div>
              </li>
            </ul>
          );
        })
      ) : (
        <Typography
          sx={{ display: "inline" }}
          className="mt-2  flex justify-center"
        >
          NO Data Found
        </Typography>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={notices.length}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Notice;
