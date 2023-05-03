import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Textarea,
  Button,
  Input,
  Avatar,
  Divider,
} from "@material-tailwind/react";
import TextField from "@mui/material/TextField";
const Add_Staff_modal = () => {
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
                className="block  text-xl  font-bold uppercase leading-normal tracking-wide  text-gray-700 "
                id="exampleModalLabel"
              >
                Staff
              </h5>
            </div>
            <div className="modal-body relative p-3">
              <div className="gap- grid grid-cols-2">
                <div className="d-flex w-full  px-1">
                  <TextField
                    id="standard-search"
                    label="Name"
                    type="search"
                    variant="standard"
                  />
                </div>
                <div className="d-flex w-full  px-1">
                  <TextField
                    id="standard-search"
                    label="email"
                    type="search"
                    variant="standard"
                  />
                </div>
              </div>
              <div className="gap- grid grid-cols-2">
                <div className="d-flex w-full  px-1">
                <TextField
                    id="standard-search"
                    label="Mobile"
                    type="number"
                    variant="standard"
                  />
                </div>
                <div className="d-flex w-full  px-1">
                  <TextField
                    id="standard-search"
                    label="Designation"
                    type="search"
                    variant="standard"
                  />
                </div>
              </div>

              <button
                type="button"
                className="mx-2 my-2
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Staff_modal;
