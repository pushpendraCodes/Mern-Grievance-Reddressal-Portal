import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext ,useState} from "react";
import { Context } from "@/Context1/User_context";
import { useNavigate } from "react-router-dom";
const Students_form = () => {
  let url = import.meta.env.VITE_API_URL;
  let navigate = useNavigate();


  const [open, setOpen] = useState(false);

  const { setmsg, setresolved } =
    useContext(Context);

  const validation = useFormik({
    validationSchema: Yup.object().shape({
      name: Yup.string()

        .min(2, "Too Short!")

        .max(50, "Too Long!")

        .required("Required"),
      gender: Yup.mixed().required("required"),
      resistration: Yup.string()
        .min(3, "too short")
        .max(15, "too long")
        .required("required"),

      class: Yup.mixed().required("this feild is required"),
      semester: Yup.mixed().required("this feild is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),

      mobile: Yup.string()
        .required("required")

        .min(10, "too short")
        .max(10, "too long"),
      guardian: Yup.string()
        .required("required")
        .min(3, "too short")
        .max(15, "tool long"),
      address: Yup.string()
        .required("required")
        .min(3, "too short")
        .max(100, "tool long"),
    }),
    initialValues: {
      name: "",
      gender: "",
      resistration: "",
      mobile: "",
      class: "",
      semester: "",
      email: "",
      guardian: "",
      address: "",
    },
    onSubmit: async (value) => {

      setOpen(true)
      let res = await axios.post(`${url}/resister/student`, value);

      if (res.status === 200) {

        validation.resetForm();
        setOpen(false)

        setmsg("successfully request registered")
        setresolved(true);
        navigate("/front_page");
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
      <ToastContainer />
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
            Students Name{" "}
          </label>{" "}
          <input
            name="name"
            value={validation.values.name || ""}
            onChange={validation.handleChange}
            class="mb-2 block w-full appearance-none rounded border border-red-500 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
            id="grid-first-name"
            type="text"
            placeholder=""
          />{" "}
          {formiKMessage("name")}
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
              value={validation.values.gender || ""}
              onChange={validation.handleChange}
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              <option> select </option>
              <option value="male"> Male </option>{" "}
              <option value="female"> Female </option>
            </select>
            {formiKMessage("gender")}{" "}
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
        <div class="w-full px-3 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-last-name"
          >
            Registration{" "}
          </label>{" "}
          <input
            name="resistration"
            value={validation.values.resistration || ""}
            onChange={validation.handleChange}
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-last-name"
            type="text"
            placeholder=""
          />{" "}
          {formiKMessage("resistration")}{" "}
        </div>
        <div class="w-full px-3 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-last-name"
          >
            Mobile{" "}
          </label>{" "}
          <input
            name="mobile"
            value={validation.values.mobile || ""}
            onChange={validation.handleChange}
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-last-name"
            type="text"
            placeholder=""
          />{" "}
          {formiKMessage("mobile")}{" "}
        </div>
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-state"
          >
            Class{" "}
          </label>{" "}
          <div class="relative">
            <select
              name="class"
              value={validation.values.class || ""}
              onChange={validation.handleChange}
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              <option> select </option>{" "}
              <option value="b.tech(cs)"> B.TECH(CS) </option>{" "}
              <option value="b.tech(civil)"> B.TECH(Civil) </option>{" "}
              <option value="b.tech(mechanichal)"> B.TECH(mechanichal) </option>{" "}
              <option value="b.tech(Electrical)"> B.TECH(Electrical) </option>{" "}
              <option value="B.SC(PCM)"> B.SC(PCM) </option>{" "}
              <option value="M.SC(Math)"> M.SC(Math) </option>{" "}
              <option value="BA"> BA </option>{" "}
            </select>{" "}
            {formiKMessage("class")}{" "}
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
        </div>{" "}
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-state"
          >
            Semester{" "}
          </label>{" "}
          <div class="relative">
            <select
              name="semester"
              value={validation.values.semester || ""}
              onChange={validation.handleChange}
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              <option> select </option> <option value="1"> 1 Sem</option>{" "}
              <option value="2"> 2 Sem</option>
               <option value="3"> 3 Sem </option>{" "}
               <option value="4"> 4 Sem</option>{" "}
               <option value="5">5 Sem</option>{" "}
               <option value="6"> 6 Sem </option>{" "}
               <option value="7"> 7 Sem </option>{" "}
               <option value="8"> 8 Sem </option>{" "}
            </select>{" "}
            {formiKMessage("semester")}{" "}
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
        <div class="mb-6 w-full px-3 md:mb-0 md:mt-3 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-password"
          >
            Email{" "}
          </label>{" "}
          <input
            name="email"
            value={validation.values.email || ""}
            onChange={validation.handleChange}
            class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-password"
          />{" "}
          {formiKMessage("email")}{" "}
          {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}{" "}
        </div>{" "}
        <div class="mb-6 w-full px-3 md:mb-0 md:mt-3 md:w-1/3">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-password"
          >
            Guardian Name{" "}
          </label>{" "}
          <input
            name="guardian"
            value={validation.values.guardian || ""}
            onChange={validation.handleChange}
            class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-password"
          />{" "}
          {formiKMessage("guardian")}
        </div>{" "}
        <div class="mb-6 w-full px-3 md:mb-0 md:mt-3 md:w-1/2">
          <label
            class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            for="grid-city"
          >
            Address{" "}
          </label>{" "}
          <Textarea
            name="address"
            value={validation.values.address || ""}
            onChange={validation.handleChange}
            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            id="grid-city"
            type="text"
            placeholder="Albuquerque"
          />{" "}
          {formiKMessage("address")}{" "}
        </div>{" "}
      </div>{" "}
      <div class="d-flex -mx-3 mb-6 flex flex-wrap justify-between">
        <Button
          onClick={validation.handleSubmit}
          variant="contained"
          color="success"
        >
          Submit
        </Button>
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

export default Students_form;
