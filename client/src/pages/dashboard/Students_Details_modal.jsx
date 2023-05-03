import React, { useContext } from "react";

import { Typography } from "@material-tailwind/react";
import Divider from "@mui/material/Divider";
import { Avatar } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";


const Students_Details_modal = (props) => {
  console.log(props);
  const { student_details, sendDetails } = props;

  const {
    name,
    email,
    gender,
    mobile,
    Class,
    semester,
    address,
    u_type,
    designation,
    employee_id
  } = student_details;
  return (
    <>
      <div
        className="modal fade fixed top-0 left-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="puspe"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog pointer-events-none relative w-auto">
          <div className="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div className="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4">
              <h5
                style={{ color: "rgb(229, 57, 53)" }}
                className="block  text-sm  font-bold uppercase leading-normal tracking-wide  text-gray-700 "
                id="exampleModalLabel"
              >
                user Details
              </h5>
              <button
                type="button"
                className="btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-1">
              <Avatar
                className="d-flex mx-auto mb-2 justify-center "
                src="https://thumbs.dreamstime.com/b/people-avatar-icons-student-student-avatar-icon-colors-193586658.jpg"
                alt="avatar"
                variant="circular"
                size="xl"
              />
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <div className="d-flex w-full  px-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mx-2 font-semibold"
                    >
                      Name
                    </Typography>
                    :
                    <Typography variant="small" color="grey" className=" mx-2">
                      {name}
                    </Typography>
                  </div>

                  {u_type === "student" && (
                    <div className="d-flex w-full  px-1">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mx-2 font-semibold"
                      >
                        Class
                      </Typography>
                      :
                      <Typography
                        variant="small"
                        color="grey"
                        className=" mx-2"
                      >
                        {Class}
                        {semester}
                      </Typography>
                    </div>
                  )}
                  {u_type === "staff" && (
                    <div className="d-flex w-full  px-1">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mx-2 font-semibold"
                      >
                        Designation
                      </Typography>
                      :
                      <Typography
                        variant="small"
                        color="grey"
                        className=" mx-2"
                      >
                        {designation}
                      </Typography>
                    </div>
                  )}
                </div>

                <Divider />

                <br />

                <div className="grid grid-cols-2 gap-4">
                  <div className="d-flex w-full  px-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mx-2 font-semibold"
                    >
                      email
                    </Typography>
                    :
                    <Typography
                      variant="small"
                      color="grey"
                      className=" text-break mx-2 "
                    >
                      {email}
                    </Typography>
                  </div>

                  <div className="d-flex w-full  px-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mx-2 font-semibold"
                    >
                      contact
                    </Typography>
                    :
                    <Typography variant="small" color="grey" className=" mx-2">
                      {mobile}
                    </Typography>
                  </div>
                </div>
                <br />
                <Divider />

                <div className="grid grid-cols-2 gap-4">
                  <div className="d-flex w-full  px-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mx-2 font-semibold"
                    >
                      Gender
                    </Typography>
                    :
                    <Typography variant="small" color="grey" className=" mx-2">
                      {gender}
                    </Typography>
                  </div>


{
  u_type==="staff"  &&<div className="d-flex w-full  px-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mx-2 font-semibold"
                    >
                      Employee Id
                    </Typography>
                    :
                    <Typography variant="small" color="grey" className=" mx-2">
                      {employee_id}
                    </Typography>
                  </div>
}

                  {u_type === "student" && (
                    <div className="d-flex w-full  px-1">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mx-2 font-semibold"
                      >
                        Address
                      </Typography>
                      :
                      <Typography
                        variant="small"
                        color="grey"
                        className=" mx-2"
                      >
                        {address}
                      </Typography>
                    </div>
                  )}
                </div>

                <br></br>
                <hr className="my-3 text-red-500 " />

                <div className="d-flex justify-end">
                  <p className="mx-1 text-sm">
                    Accept the request and send the login details
                  </p>

                  <button
                    color="red"
                    type="button"
                    className="ml-1
rounded
bg-blue-900
px-3
py-1.5
text-center
text-xs
font-medium
uppercase
leading-tight
text-white
shadow-md transition
duration-150 ease-in-out hover:bg-blue-400 hover:shadow-lg
focus:outline-none
focus:ring-0
active:shadow-lg"
                    id="modal"
                    onClick={() => {
                      sendDetails(student_details);
                    }}
                  >
                    <SendIcon />
                  </button>
                  <button
                    type="button"
                    className="mx-2
        rounded
        bg-purple-600
        px-6
        py-2.5
        text-xs
        font-medium
        uppercase
        leading-tight
        text-white
        shadow-md
        transition duration-150
        ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700
        focus:shadow-lg focus:outline-none
        focus:ring-0
        active:bg-purple-800
        active:shadow-lg"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students_Details_modal;
