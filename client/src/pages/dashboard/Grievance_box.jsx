import { UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { RiGalleryFill } from "react-icons/ri";
import pic from "../../../public/img/newBlink.gif";
import { AiOutlineDelete } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
const Grievance_box = (props) => {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const { name, _id, status, subject, message, date, Class,mobile, semester, file } =
    props.item;

  let url = import.meta.env.VITE_API_URL;
  let user_type = JSON.parse(localStorage.getItem("u_type"));
  let newdate = date.toLocaleString();
  const [bg, setbg] = useState("");
  const [word_count, setcount] = useState(200);
  console.log();
  console.log(bg);
  const setStatus_bg_Color = () => {
    if (status === "pending") {
      setbg("orange");
    } else if (status === "resolved") {
      setbg("green");
    } else if (status === "rejected") {
      setbg("red");
    }
  };

  useEffect(() => {
    setStatus_bg_Color();
  }, [status]);

  return (
    <div className="container sm:p-2 lg:p-5">
      <div style={{ border: "1px solid black" }} className="box p-3  ">
        <div className="firstrow flex justify-between  ">
          <div className="first_half flex gap-4  ">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">{name}</Typography>
                  <span>{"Class"}</span> : <b>{Class}</b> &nbsp; {semester} sem
                  <br />
                  <span>{"mobile"}</span> : <b>{mobile}</b>
                </React.Fragment>
              }
            >
              <UserCircleIcon  className="cursor-pointer" width={30} />
            </HtmlTooltip>

            <b>{subject}?</b>
          </div>
          <div className="second_half flex gap-4  ">
            <p>{newdate.slice(0, 24)}</p>

            {user_type === "s" && status === "pending" && (
              <button
                onClick={() => {
                  props.delete_grievance(_id);
                }}
                className=" rounded-md bg-red-500 p-1 px-2 hover:bg-red-400"
              >
                Reject
              </button>
            )}

            {user_type === "student" && (
              <button
                onClick={() => {
                  props.delete_grievance(_id);
                }}
                className=" rounded-md p-1 px-2 "
              >
                <AiOutlineDelete fontSize={25} color="red" />
              </button>
            )}

            {user_type === "s" && (
              <button
                data-bs-toggle="modal"
                data-bs-target="#puspe"
                onClick={() => {
                  props.get_details_grievance(_id);
                }}
                className="rounded-md bg-green-400 p-1 px-2 hover:bg-green-300"
              >
                {status === "pending" ? "Accept" : "Review"}
              </button>
            )}
          </div>
        </div>
        <div className="second_row my-3">
          <p style={{ fontSize: "14px" }} className="  ">
            {message.slice(0, word_count)}..&nbsp;
            {message.length > word_count && (
              <a
                onClick={() => {
                  setcount(message.length);
                }}
                className="cursor-pointer text-blue-500"
              >
                read more
              </a>
            )}
          </p>
        </div>

        <div className="third_row flex justify-between">
          <Chip
            className="text-white"
            sx={{
              backgroundColor: bg,
            }}
            label={status}
            variant="outlined"
          />

          {file.length > 0 && (
            <div className="flex cursor-pointer gap-2 hover:text-blue-300">
              <RiGalleryFill fontSize={25} />
              <a
                pdf
                className="text-red-300"
                href={`${url}/${file[0]}`}
                target="blank"
              >
                view Documents
              </a>
            </div>
          )}

          {status === "resolved" && user_type === "student" && (
            <div className="flex cursor-pointer gap-2 hover:text-blue-300">
              <BiMailSend fontSize={25} />
              <a
                data-bs-toggle="modal"
                data-bs-target="#puspe"
                className="text-red-300"
                target="blank"
                onClick={() => {
                  props.view_stu_grievance(_id);
                }}
              >
                view Reply
              </a>
            </div>
          )}

          {props.i == 0 && <img src={pic} alt="" />}
        </div>
      </div>
    </div>
  );
};

export default Grievance_box;
