import React from "react";
import { Typography } from "@material-tailwind/react";

import { AiFillDelete } from "react-icons/ai";
const Student_list = (props) => {
  const { data } = props;
  const { name,_id, email, Class, semester, mobile } = data;


  return (
    <>
      <tr key={props.index}>
        <td className="border-b border-blue-gray-50 py-3 px-5 ">
          <Typography className="text-xs font-semibold text-blue-gray-600">
        {props.index+1}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-500"></Typography>
        </td>

        <td className="border-b border-blue-gray-50 py-3 px-5 ">
          <div className="flex items-center gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {name}
              </Typography>
              <Typography className="text-xs font-normal text-blue-gray-500">
                {email}
              </Typography>
            </div>
          </div>
        </td>

        <td className="border-b border-blue-gray-50 py-3 px-5 ">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {Class}
            </Typography>
            <Typography className="text-xs font-normal text-blue-gray-500">
              <b>Semester:</b> {semester}
            </Typography>
          </div>
        </td>

        <td className="border-b border-blue-gray-50 py-3 px-5 ">
          <Typography className="text-xs font-normal text-blue-gray-500">
            {mobile}
          </Typography>
        </td>

        <td
          style={{ display: "flex" }}
          className="border-b border-blue-gray-50 py-3 px-5 "
        >


          <AiFillDelete  fontSize={20} className="text-red-500 cursor-pointer"  onClick={()=>{props.remove_student(_id)}} />

        </td>
      </tr>
    </>
  );
};

export default Student_list;
