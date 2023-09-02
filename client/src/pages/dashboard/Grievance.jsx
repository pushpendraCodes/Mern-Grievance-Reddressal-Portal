import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import TextField from "@mui/material/TextField";

import TablePagination from "@mui/material/TablePagination";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import Resolve from "./Resolve";

import Stu_grievance_details from "./Stu_grievance_details";

import Grievance_box from "./Grievance_box";

const Grievance = () => {
  let url = import.meta.env.VITE_API_URL;
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = useState("");
  const [sub, setsub] = useState("");

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(1);

  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  // upload file-----
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  let user_id = JSON.parse(localStorage.getItem("user_id"));
  let u_type = JSON.parse(localStorage.getItem("u_type"));

  // post grievance----
  const send_msg = async () => {
    setOpen(true);
    const formdata = new FormData();
    formdata.append("sub", sub);
    formdata.append("msg", msg);
    formdata.append("file", selectedFile);

    if (msg && sub) {
      let res = await axios.post(
        `${url}/send/grievance/${user_id}`,
        formdata,

        {
          headers: {
            "Content-Type": "application/pdf,image/*",
            authorization: JSON.parse(localStorage.getItem("user")),
          },
        }
      );

      if (res.status === 200) {
        setOpen(false);
        getGrievance_History();
        setmsg(" ");
        setsub(" ");
        setPreview(undefined);
        setSelectedFile(undefined);
        toast.success(res.data.msg, {
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
      setOpen(false);
      toast.warn("both feild  is required", {
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
  const [grievance, setgrievance] = useState([]);

  const mapReverse2 = [...grievance].reverse().map((element) => {
    return element;
  });
  const [sort, setsort] = useState("All");
  useEffect(() => {
    get_grievance();
  }, [sort]);
  useEffect(() => {
    get_grievance();
  }, []);

  const handleChange_radio = (e) => {
    console.log(e.target.value);
    setsort(e.target.value);
  };

  // admin grievance list---
  const get_grievance = async () => {
    setOpen(true);
    let res = await axios.post(
      `${url}/get/grievance`,
      { sort: sort },

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );

    if (res.status === 200) {
      setOpen(false);
      setgrievance(res.data.result);
    } else {
      setOpen(false);
    }
  };

  // hover students details----

  const [user, setUserDetails] = useState();

  const userDetails = (id) => {
    let filter = grievance.filter((item) => id === item._id);

    setUserDetails(filter);
  };

  // admin delete grievance---
  const delete_grievance = async (id) => {
    setOpen(true);
    let res = await axios.post(
      `${url}/delete/grievance/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );
    if (res.status === 200) {
      setOpen(false);
      get_grievance();
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
  };

  const [reply_msg, set_reply] = useState();
  const [input_box, setinput] = useState(false);
  const [data, setdata] = useState([]);

  // admin respons api---
  const reply = async (id) => {
    setOpen(true);

    if (reply_msg) {
      let res = await axios.post(
        `${url}/resolve/grievance/${id}`,
        { reply_msg: reply_msg },

        {
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("user")),
          },
        }
      );
      if (res.status === 200) {
        setOpen(false);
        var myModalEl = document.getElementById("puspe");
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        get_grievance();
        toast.success("successfully Answerd the grievnace", {
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
        get_grievance();
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
      setOpen(false);
      toast.warn("please write some text", {
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

  const [grievance_id, setGrievance_id] = useState();

  const get_details_grievance = async (id) => {
    setOpen(true);
    setGrievance_id(id);
    let res = await axios.get(
      `${url}/details/grievance/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );
    if (res.status === 200) {
      console.log(res, "details");
      setOpen(false);
      setdata(res.data.result.message);
    } else {
      setOpen(false);
    }
  };

  const [grie_history, sethistory] = useState([]);

  const mapReverse1 =
    grie_history &&
    [...grie_history].reverse().map((element) => {
      return element;
    });
  useEffect(() => {
    getGrievance_History();
  }, []);

  // student grievance listing----
  const getGrievance_History = async () => {
    setOpen(true);
    let res = await axios.get(
      `${url}/History/grievance/student/${user_id}`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );
    if (res.status === 200) {
      console.log(res.data.result, "student");
      setOpen(false);
      sethistory(res.data.result);
    } else {
      setOpen(false);
    }
  };

  const delete_stu_grievance = async (id) => {
    if (window.confirm("are you sure")) {
      setOpen(true);
      let res = await axios.delete(
        `${url}/delete/grievance/student/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("user")),
          },
        }
      );
      if (res.status === 200) {
        setOpen(false);
        getGrievance_History();
        toast.success("Successfully Deleted", {
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
      setOpen(false);
    }
  };
  const [modal_data, setData] = useState();

  const view_stu_grievance = async (id) => {
    setOpen(true);
    let res = await axios.post(
      `${url}/view/grievance/student/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      }
    );
    if (res.status === 200) {
      setOpen(false);
      setData(res.data.result);
    } else {
      setOpen(false);
    }
  };

  // sorting radio button----

  return (
    <>
      {u_type === "student" && (
        <>
          <ToastContainer />

          <Stu_grievance_details modal_data={modal_data} />
          <div className=" mb-8 flex flex-col gap-3">
            <h2 className="text-bold text-center text-green-400 ">
              Post Grievance
            </h2>
            <Card>
              <div>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>

              <CardBody>
                <div>
                  <TextField
                    id="filled-multiline-flexible"
                    label="Subject"
                    multiline
                    maxRows={4}
                    onChange={(e) => {
                      setsub(e.target.value);
                    }}
                    value={sub}
                    variant="filled"
                  />

                  <TextField
                    id="filled-multiline-flexible"
                    label="Grievance"
                    multiline
                    maxRows={4}
                    onChange={(e) => {
                      setmsg(e.target.value);
                    }}
                    value={msg}
                    variant="filled"
                    className="my-3 w-full"
                  />
                </div>

                <form class="my-3 flex items-center space-x-6">
                  <div class="shrink-0">
                    <UploadFileIcon />
                  </div>
                  <label class="block">
                    <span class="sr-only">Choose file </span>
                    <input
                      accept="application/image"
                      type="file"
                      class="text-slate-500 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100
      block w-full text-sm
      file:mr-4 file:rounded-full
      file:border-0 file:py-2
      file:px-4 file:text-sm
      file:font-semibold
    "
                      name="file"
                      onChange={onSelectFile}
                    />
                  </label>
                  {preview && (
                    <figure className="relative p-3 ">
                      <img
                        className="h-56 w-56 rounded-sm object-cover "
                        src={preview}
                        alt=""
                      />
                      <p
                        onClick={() => {
                          setPreview(undefined);
                          setSelectedFile(undefined);
                        }}
                        className="absolute top-0.5 right-3 cursor-pointer "
                      >
                        x
                      </p>
                    </figure>
                  )}
                </form>

                <Button onClick={send_msg} color="red" className="">
                  Send
                </Button>
              </CardBody>
            </Card>
          </div>

          <Typography className="text-md bold my-2 text-blue-700">
            Grievance history-
          </Typography>

          {mapReverse1
            ? mapReverse1
                .slice(pg * rpg, pg * rpg + rpg)

                .map((item, i) => {
                  const { subject, message, date, status, _id } = item;
                  return (
                    <Grievance_box
                      i={i}
                      delete_grievance={delete_stu_grievance}
                      view_stu_grievance={view_stu_grievance}
                      item={item}
                    />
                  );
                })
            : null}

          <TablePagination
            rowsPerPageOptions={[1, 2, 3]}
            component="div"
            count={mapReverse1.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {u_type === "s" && (
        <>
          <div className=" mb-8 flex flex-col gap-3">
            <Resolve
              get_details_grievance={get_details_grievance}
              grievance_id={grievance_id}
              reply={reply}
              reply_msg={reply_msg}
              set_reply={set_reply}
              input_box={input_box}
              setinput={setinput}
              data={data}
              setdata={setdata}
            />

            <ToastContainer />

            <h2 className="text-bold text-center text-green-400 ">
              Grievance History
            </h2>
            <div>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChange_radio}
              >
                <FormControlLabel
                  checked={sort === "All"}
                  value="All"
                  control={<Radio />}
                  label="All"
                />
                <FormControlLabel
                  checked={sort === "pending"}
                  value="pending"
                  control={<Radio />}
                  label="Pending"
                />
                <FormControlLabel
                  checked={sort === "resolved"}
                  value="resolved"
                  control={<Radio />}
                  label="Resolved"
                />
                <FormControlLabel
                  checked={sort === "rejected"}
                  value="rejected"
                  control={<Radio />}
                  label="Rejected"
                />
              </RadioGroup>
            </FormControl>

            {mapReverse2.length > 0 ? (
              mapReverse2
                .slice(pg * rpg, pg * rpg + rpg)

                .map((item, i) => {
                  return (
                    <Grievance_box
                      item={item}
                      delete_grievance={delete_grievance}
                      get_details_grievance={get_details_grievance}
                      i={i}
                      userDetails={userDetails}
                      user={user}
                    />
                  );
                })
            ) : (
              <span className="text-center">No Data Found</span>
            )}

            <TablePagination
              rowsPerPageOptions={[1, 2, 3]}
              component="div"
              count={mapReverse2.length}
              rowsPerPage={rpg}
              page={pg}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Grievance;
