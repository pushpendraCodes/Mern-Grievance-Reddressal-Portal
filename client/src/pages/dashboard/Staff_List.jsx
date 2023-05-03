
import React from "react";
import { Typography } from "@material-tailwind/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { AiFillDelete } from "react-icons/ai";
const Staff_List = (props) => {
  const { data } = props;
  const { name,_id, email, designation , mobile } = data;


  return (
    <>
      <tr key={props.index}>
        <td className="border-b border-blue-gray-50 py-3 px-5 ">

          <Typography className="text-xs font-normal text-blue-gray-500">
            {props.index+1}
          </Typography>
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
              {designation}
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



          <AiFillDelete
          color="red"
          className="cursor-pointer"
          fontSize={20}
            onClick={()=>{props.delete_staff(_id)}}
           />
        </td>
      </tr>
    </>
  );
};

export default Staff_List;
