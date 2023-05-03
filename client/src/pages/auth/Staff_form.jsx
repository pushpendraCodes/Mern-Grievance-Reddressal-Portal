import React from "react";
import { Link, Navigate } from "react-router-dom";
import {

  Button,
  Typography,

} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Context } from "@/Context1/User_context";
import { useContext } from "react";
const Staff_form = () => {
let Navigate = useNavigate()
  let url = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);



  const { setresolved ,setmsg } = useContext(Context);

  const validation = useFormik({
    validationSchema: Yup.object().shape({
      name: Yup.string()

        .min(2, "Too Short!")

        .max(50, "Too Long!")

        .required("Required"),
      gender: Yup.mixed().required("required"),
      employee_id: Yup.string()
        .min(3, "too short")
        .max(15, "too long")
        .required("required"),

      // department: Yup.mixed().required("this feild is required"),
      designation: Yup.mixed().required("this feild is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),

      mobile: Yup.string()
        .required("required")

        .min(10, "too short")
        .max(10, "too long"),
    }),
    initialValues: {
      name: "",
      gender: "",
      employee_id: "",
      mobile: "",
      // department: "",
      designation: "",
      email: "",
    },
    onSubmit: async (value) => {

      setOpen(true)

      let res = await axios.post(`${url}/resister/staff`, value);

      if (res.status === 200) {
        setOpen(false)
        setmsg("successfully request resistered")
        setresolved(true)

        // setresolved(true);
        Navigate("/dashboard/home")
      } else {
        validation.resetForm();
        setOpen(false)

        toast.error(res.data.result, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        validation.setFieldValue(" ");
      }
    },
  });

  const isValidation = (name) =>
    !!(validation.touched[name] && validation.errors[name]);
  const formiKMessage = (name) => {
    return (
      isValidation(name) && (
        <p
          style={{
            fontSize: "11px",
          }}
          className="text-danger m-0 p-0 "
        >
          {" "}
          {validation.errors[name]}{" "}
        </p>
      )
    );
  };

  let auth = JSON.parse(localStorage.getItem("user"));
  return (
    <>


<div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
      <div class="-mx-3 mb-6 flex flex-wrap">
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-first-name"
          >
            Staff Name{" "}
          </label>{" "}
          <input
            name="name"
            onChange={validation.handleChange}
            value={validation.values.name}
            class="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
            id="grid-first-name"
            type="text"
            placeholder=""
          />{" "}
          {formiKMessage("name")} {""}{" "}
        </div>
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-state"
          >
            Gender{" "}
          </label>{" "}
          <div class="relative">
            <select
              name="gender"
              value={validation.values.gender}
              onChange={validation.handleChange}
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              <option > select </option>
              <option value="male" > Male </option>

               <option  value="female" > Female </option>
            </select>
            {formiKMessage("gender")} {""}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                {" "}
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <div class="w-full px-3 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-last-name"
          >
            Employee Id
          </label>{" "}
          <input
            name="employee_id"
            value={validation.values.employee_id}
            onChange={validation.handleChange}
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-last-name"
            type="text"
            placeholder=""
          />{" "}
          {formiKMessage("employee_id")} {""}
        </div>
        <div class="w-full px-3 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-last-name"
          >
            Mobile
          </label>
          <input
            name="mobile"
            value={validation.values.mobile}
            onChange={validation.handleChange}
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-last-name"
            type="text"
            placeholder=""
          />{" "}
          {formiKMessage("mobile")} {""}
        </div>
        {/* <div class="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-state"
          >
            Department
          </label>
          <div class="relative">
            <select
              name="department"
              value={validation.values.department}
              onChange={validation.handleChange}
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              <option value="b.tech(mech)"> B.TECH(CS) </option>
              <option value="b.tech(cs)"> B.TECH(CS) </option>
              <option value="b.tech(civil)"> B.TECH(CS) </option>
            </select>{" "}
            {formiKMessage("department")} {""}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                {" "}
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "} */}
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-state"
          >
            Designation{" "}
          </label>{" "}
          <div class="relative">
            <select
              name="designation"
              value={validation.values.designation}
              onChange={validation.handleChange}
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              <option> select </option> <option value="Teacher"> Teacher</option>{" "}

              <option value="Gaurd"> Gaurd </option>
               <option value="HOD"> HOD </option>{" "}

            </select>{" "}
            {formiKMessage("designation")} {""}
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                {" "}
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <div class="mb-6 w-full px-3 md:mb-0 md: md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-password"
          >
            Email{" "}
          </label>{" "}
          <input
            name="email"
            value={validation.values.email}
            onChange={validation.handleChange}
            class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-password"
          />{" "}
          {formiKMessage("email")} {""}
        </div>
      </div>
      <div class="d-flex -mx-3 mb-6 flex flex-wrap justify-between">


        <Button

        onClick={validation.handleSubmit}
         variant="contained"  color="success" >Submit</Button>

        {!auth && (
          <Typography variant="large" className="mt-6 flex justify-center">
            Already have an account ?
            <Link to="/auth/sign-in">
              <Typography
                as="span"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign in
              </Typography>{" "}
            </Link>{" "}
          </Typography>
        )}
        <Link to={!auth ? "/auth/front_page" : "/dashboard/home"}>
          <Typography
            as="span"
            variant="small"
            color="blue"
            className="ml-1 font-bold"
          >
            Back to home{" "}
          </Typography>{" "}
        </Link>{" "}
      </div>{" "}
    </>
  );
};

export default Staff_form;
