import React, { useRef } from "react";
import {

  Typography,

} from "@material-tailwind/react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const NoticeList = (props) => {
  const { name, email, semester, mobile, Class ,_id,u_type  } = props.data;

  const { className } = props.className;




  return (
    <tr key={props.keword}>
      <td className="border-b border-blue-gray-50 py-3 px-5 ">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {props.keword + 1}
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
            {u_type}
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

<AiFillEdit fontSize={20} className="mx-2" color="blue"   data-bs-toggle="modal"
          data-bs-target="#puspe"  onClick={()=>{props.View_request(_id)}}  />


        <AiFillDelete fontSize={20}   color="red" onClick={()=>{props.delete_request(_id)}}   />
      </td>
    </tr>
  );
};

export default NoticeList;
