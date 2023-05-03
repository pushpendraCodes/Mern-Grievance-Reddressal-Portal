import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Textarea,
  Button,
  Input,
} from "@material-tailwind/react";

import "react-toastify/dist/ReactToastify.css";

const Resolve = (props) => {
  const {
    get_details_grievance,
    setdata,
    data,
    reply_msg,
    reply,
    grievance_id,
    set_reply,
  } = props;
  console.log(grievance_id, "grievance_id");

  return (
    <div>
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
                className="  block  text-xs font-bold uppercase leading-normal tracking-wide text-gray-700 "
                id="exampleModalLabel"
              >
                Grievance
              </h5>
              <button
                type="button"
                className="btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <form>
                <div className="grid  ">
                  <Typography className="w-full px-3 text-sm  font-normal text-blue-gray-500">
                    <span className="mx-1 text-sm font-bold text-red-300 ">

                      QUE -
                    </span>
                    {data}
                  </Typography>
                </div>

                <br />

                <Textarea
                  className="my-2"
                  value={reply_msg}
                  onChange={(e) => {
                    set_reply(e.target.value);
                  }}
                  placeholder=""
                  label="reply"
                />

                <button
                  type="button"
                  className="ml-1
  rounded
  bg-blue-600
  px-6
  py-2.5
  text-center
  text-xs
  font-medium
  uppercase
  leading-tight
  text-white
  shadow-md transition
  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg
  focus:bg-blue-700 focus:shadow-lg
  focus:outline-none
  focus:ring-0
  active:bg-blue-800
  active:shadow-lg"
                  onClick={() => {
                    reply(grievance_id);
                  }}
                >
                  Reply
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resolve;
