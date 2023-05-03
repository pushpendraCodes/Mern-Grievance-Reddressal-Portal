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
import { useState } from "react";
import Students_form from "./Students_form";
import Staff_form from "./Staff_form";


export function SignUp() {
  const [user_type, setuser] = useState("student")
  const getuser_type = (e) => {
    setuser(e.target.value)
  }


  return (
    <>

      <div className="container mx-auto p-4">

        <div  class="w-full max-w-xxl mx-auto " >


          <h1 className="block uppercase tracking-wide text-blue-500  text-xxl text-center my-5 font-bold " > <h1 className="text-center font-semibold text-green-300 ">Student E-Grievance Reddresal Portal</h1></h1>



        </div>

        <form   class="w-full max-w-xxl mx-auto ">
          <div class="w-full md:w-1/2 my-4 px-3 mb-6 md:mb-0">
            <b className="mx-3">Your are :</b>
            <label htmlFor="Students">Student</label>
            <input checked={user_type === "student"} onClick={getuser_type} value="student" className="mx-2" type="radio" name="users" />
            <label htmlFor="staffs">Teacher/staff</label>
            <input checked={user_type === "staff"} onClick={getuser_type} value="staff" className="mx-2" type="radio" name="users" />


          </div>

          {
            user_type === "student" ?

              <Students_form/>

              :
              <Staff_form/>
             }


        </form>


      </div>
    </>
  );
}

export default SignUp;
