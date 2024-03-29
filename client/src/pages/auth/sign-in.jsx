import "bootstrap/dist/css/bootstrap.min.css";
import OtpInput from "react-otp-input";
import {} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "@/Context1/User_context";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaBackward, FaHome } from "react-icons/fa";
export function SignIn() {
  let url = import.meta.env.VITE_API_URL;
  // let url = "https://grievence-portal.onrender.com";

  const [view, setview] = useState(false);
  const [open, setOpen] = useState(false);

  const { setresolved, setmsg } = useContext(Context);

  let navigate = useNavigate();




  async function demoAdmin(){

    setOpen(true);

    try {
      setOpen(true);
      let res = await axios.post(`${url}/api/demoAdmin/login`);

      if (res.status === 200) {
        setOpen(false);
        setmsg("successfully loged in");
        setresolved(true);

        localStorage.setItem("user", JSON.stringify(res.data.token));
        localStorage.setItem("u_type", JSON.stringify(res.data.u_type));
        localStorage.setItem("user_name", JSON.stringify(res.data.name));
        localStorage.setItem("user_id", JSON.stringify(res.data.user_id));

        if (res.data.u_type === "student") {
          navigate("/dashboard/grievance");
        }
        if (res.data.u_type === "s") {
          navigate("/dashboard/home");
        }
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
    } catch (error) {
      setOpen(false);

     console.log(error,"error")
    }

  }
  async function demoStudent(){

    setOpen(true);

    try {
      setOpen(true);
      let res = await axios.post(`${url}/api/demoStudent/login`);
console.log(res,"res")
      if (res.status === 200) {
        setOpen(false);
        setmsg("successfully loged in");
        setresolved(true);

        localStorage.setItem("user", JSON.stringify(res.data.token));
        localStorage.setItem("u_type", JSON.stringify(res.data.u_type));
        localStorage.setItem("user_name", JSON.stringify(res.data.name));
        localStorage.setItem("user_id", JSON.stringify(res.data.user_id));

        if (res.data.u_type === "student") {
          navigate("/dashboard/grievance");
        }
        if (res.data.u_type === "s") {
          navigate("/dashboard/home");
        }
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
    } catch (error) {
      setOpen(false);

      console.log(error,"error")
    }

  }

  const onSubmit = async (values) => {
    setOpen(true);

    try {
      setOpen(true);
      let res = await axios.post(`${url}/api/login`, values);

      if (res.status === 200) {
        setOpen(false);
        setmsg("successfully loged in");
        setresolved(true);

        localStorage.setItem("user", JSON.stringify(res.data.token));
        localStorage.setItem("u_type", JSON.stringify(res.data.u_type));
        localStorage.setItem("user_name", JSON.stringify(res.data.name));
        localStorage.setItem("user_id", JSON.stringify(res.data.user_id));

        if (res.data.u_type === "student") {
          navigate("/dashboard/grievance");
        }
        if (res.data.u_type === "s") {
          navigate("/dashboard/home");
        }
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
    } catch (error) {
      setOpen(false);

      console.log(error,"error")
    }
  };

  const validation = useFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .min(1, "Mininum 1 characters")
        .max(50, "Maximum 30 characters")
        .required("email is required"),
      password: Yup.string().max(30).required("Password is required"),
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  const isValidation = (name) =>
    !!(validation.touched[name] && validation.errors[name]);
  const formiKMessage = (name) => {
    return (
      isValidation(name) && (
        <p style={{ fontSize: "11px" }} className="text-danger ">
          {validation.errors[name]}
        </p>
      )
    );
  };
  const [email, setemail] = useState("");
  const [MSG, setMSG] = useState("");
  const [isValid, setvalid] = useState(false);
  const [pw, setpw] = useState("");
  const [c_pw, setc_pw] = useState("");
  const [bg, setbg] = useState("light");
  const [open_modal, setOpen_modal] = useState(false);
  const handleOpen = () => {
    setOpen_modal(true)
    setMSG(" ");
  };


  const handleClose = () => setOpen_modal(false);
  const [otp, setOtp] = useState("");
  const submit = async () => {

    if (email) {
      let res = await axios.post(`${url}/check/email`, { email: email });

      if (res.status === 200) {
        setvalid(true);
      } else {
        setemail(null);
        setMSG(res.data.msg);
      }
    }else{
      setMSG("email is required");
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: "5px",
    p: 4,
  };
  return (
    <>
      <div>
        <Modal
          open={open_modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              className="my-2 "
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Reset Password
            </Typography>

            <TextField
              onChange={(e) => {
                setemail(e.target.value);
              }}
              id="standard-basic"
              label="Email"
              className="my-2 "
              sx={{ width: "35ch" }}
              variant="standard"
            />
            {isValid && (
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            )}

            <br />
            <Typography className="my-1 text-red-500" id="modal-modal-title">
              {MSG}
            </Typography>
            <br />
            <div className="flex justify-between">
            <Button
              variant="contained"
              className="my-3"
              size="small"
              color="primary"
              onClick={submit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className="my-3"
              size="small"
              color="primary"

              onClick={handleClose}
            >
             Close
            </Button>
            </div>


          </Box>
        </Modal>
      </div>

      <section style={{ backgroundColor: bg }} class="h-screen  ">
        <ToastContainer />
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>

        <div class="flex flex-row items-center justify-center lg:justify-end">
          <Link to="/frontpage" className="flex">
            <FaHome
              className="mx-2"
              style={{ color: bg === "black" ? "white" : "black" }}
              fontSize={20}
            />
          </Link>

          <MdLightMode
            className="mx-2 cursor-pointer "
            onClick={() => {
              setbg("white");
            }}
            fontSize={25}
          />

          <MdDarkMode
            style={{ color: bg === "black" ? "white" : "gray" }}
            className="mr-2 cursor-pointer"
            onClick={() => {
              setbg("black");
            }}
            fontSize={25}
          />
        </div>

        <div class="h-full">
          <h1 className="text-center font-semibold text-green-300 ">
            Student E-Grievance Reddresal Portal
          </h1>

          <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="w-full"
                alt="Sample image"
              />
            </div>

            <div class="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form onSubmit={validation.handleSubmit}>
                <div class="before:border-neutral-300 after:border-neutral-300 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t after:mt-0.5 after:flex-1 after:border-t">
                  <p
                    style={{ color: bg === "black" ? "white" : "black" }}
                    class="mx-4 mb-0 text-center font-semibold dark:text-white"
                  >
                    Login
                  </p>
                </div>

                <div
                  style={{ borderBottom: "1px solid gray" }}
                  class="relative mb-6 lg:w-1/2 "
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    name="email"
                    value={validation.values.email}
                    onChange={validation.handleChange}
                    label="email"
                    class="data-[te-input-state-active]:placeholder:opacity-100 dark:text-neutral-200 dark:placeholder:text-neutral-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none "
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                  />
                  {formiKMessage("email")}
                </div>

                <div
                  style={{ borderBottom: "1px solid gray" }}
                  class="relative mb-6  lg:w-1/2 "
                  data-te-input-wrapper-init
                >
                  <input
                    name="password"
                    value={validation.values.password}
                    onChange={validation.handleChange}
                    type={view === false ? "password" : "text"}
                    label="Password"
                    class="data-[te-input-state-active]:placeholder:opacity-100 dark:text-neutral-200 dark:placeholder:text-neutral-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none "
                    id="exampleFormControlInput22"
                    placeholder="Password"
                  />
                  {formiKMessage("password")}
                  {view === true ? (
                    <BsEye
                      style={{
                        position: "absolute",
                        top: "47%",
                        left: "90%",
                      }}
                      onClick={() => {
                        setview(!view);
                      }}
                    />
                  ) : (
                    <BsEyeSlash
                      style={{
                        position: "absolute",
                        top: "47%",
                        left: "90%",
                      }}
                      onClick={() => {
                        setview(!view);
                      }}
                    />
                  )}
                  {/* <label
                    for="exampleFormControlInput22"
                    class="text-neutral-500 peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] dark:text-neutral-200 dark:peer-focus:text-primary pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] motion-reduce:transition-none"
                  >
                    Password
                  </label> */}
                </div>

                {/* <div class="mb-6 flex items-center justify-between">
                  <a onClick={handleOpen} className="text-blue-500" href="#!">
                    Forgot password?
                  </a>
                </div> */}

                <div class=" lg:text-left">
                  <button
                    class="bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    type="submit"
                  >
                    Login
                  </button>
                  <br />
                </div>
                <div className="my-5 flex justify-evenly">
                  <p class="mb-0  text-sm font-semibold">
                    Don't have an account?
                    <Link to="/auth/sign-up">
                      <a
                        href="#!"
                        class="text-danger hover:text-danger-600 focus:text-danger-600 active:text-danger-700 transition duration-150 ease-in-out"
                      >
                        Register
                      </a>
                    </Link>
                  </p>

                </div>
                <div>
                <p class="mb-0  text-sm font-semibold">


  <button
  onClick={demoAdmin}
    class="text-primary hover:text-danger-600 focus:text-danger-600 active:text-danger-700 transition duration-150 ease-in-out"
  >
    login as demo admin account?
  </button>

</p>
<p class="mb-0  text-sm font-semibold">


  <button
  onClick={demoStudent}
    class="text-primary hover:text-danger-600 focus:text-danger-600 active:text-danger-700 transition duration-150 ease-in-out"
  >
    login as demo student account?
  </button>
</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
