import React  from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import pic from "../dashboard/notfound.jpg";

import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NoticeList from "./NoticeList";

import Students_Details_modal from "./Students_Details_modal";

const Resistration = () => {
  const [open, setOpen] = React.useState(false);


  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  function handleChangePage(event, newpage) {
      setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
      setrpg(parseInt(event.target.value, 10));
      setpg(0);
  }

  let url = import.meta.env.VITE_API_URL;
  const [showPerPage, setShowPerPage] = useState(5);

  const [pagination, setPagination] = useState({
    start: 0,
    end: 5,
  });
  const { start, end } = pagination;

  const paginationChange = (Start, End) => {
    setPagination({ start: Start, end: End });


  };

  const [request, setRequest] = useState([]);

  const mapReverse2 = [...request].reverse().map((element) => {
    return element;
  });

  const getRequest = async () => {
    setOpen(true)
    let res = await axios.get(`${url}/get/request`, {
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    }
    );
    console.log(res, "res");
    if (res.status === 200) {
      setOpen(false)
      setRequest(res.data.result);
    }
  };
  useEffect(() => {
    getRequest();
  }, []);


  const[student_details ,setStudents_details]=useState([])
  const View_request = async (id) => {
    setOpen(true)
    let res = await axios.post(`${url}/get/students/details/${id}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    })
console.log(res,"res")
    if(res.status===200){
      setOpen(false)
      setStudents_details(res.data.result)
    }else{
      setOpen(false)


    }


  };
  const sendDetails =async (data)=>{

    setOpen(true)
    let res = await axios.post(`${url}/send/details` , data ,{
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("user")),
      },
    })
    if(res.status===200){
      setOpen(false)
      var myModalEl = document.getElementById('puspe');
      var modal = bootstrap.Modal.getInstance(myModalEl)
      modal.hide();
      toast.success("🦄 user login details has been send!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });


      getRequest();
    }else{
      setOpen(false)
      toast.error("🦄 something went wrong!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }



  }

  const [Name, setName] = useState("");

  const search_user = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = subAdminData.filter((user) => {
        return user.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setData(results);
    } else {
      getSubadmin();
    }

    setName(keyword);
  };

  const delete_request = async (id) => {
    setOpen(true)
    console.log("id", id);
    if (window.confirm("Sure want to delete?")) {
      let res = await axios.delete(`${url}/delete/request/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("user")),
        },
      });

      if (res) {
        setOpen(false)

        getRequest();
        toast.success("🦄 user has been deleted!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      getRequest();
      setOpen(false)
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer />

     <Students_Details_modal  student_details={student_details} sendDetails={sendDetails}  />

      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-2">
          <Typography variant="h6" color="white">
            Students Request
          </Typography>

          <button
            style={{
              width: "115px",
              float: "right",
              backgroundColor: "#e53935",
            }}
            type="button"
            className="
  rounded
  bg-yellow-600 px-6
  py-2.5
  text-xs
  font-medium
  uppercase
  leading-tight
  text-white
  shadow-md
  transition duration-150
  ease-in-out hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700
  focus:shadow-lg focus:outline-none
  focus:ring-0
  active:bg-yellow-800
  active:shadow-lg"
          >
            Request
          </button>
        </CardHeader>

        <div className="mx-4 my-4 mr-auto  md:mr-4 md:w-56">
          <Input
            label="Type here"
            value={Name}
            onChange={(e) => {
              search_user(e);
            }}
          />
        </div>


        <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>



        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["S.no", "Name", "User Type", "contact", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {request.length > 0 ? (
                mapReverse2
                .slice(pg * rpg, pg *
                            rpg + rpg)
                  .map((data, key) => {
                    const className = `py-3 px-5 ${
                      key === mapReverse2.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <NoticeList

                        keword={key}

                        data={data}
                        className={className}
                        delete_request={delete_request}
                        View_request={View_request}

                      />
                    );
                  })
              ) : (
                <>
                <Typography className="text-gray-400 d-flex justify-end font-bold my-3">No Request</Typography>
                  <figure style={{ width: "500px" }}>
                    <img
                      style={{ width: "150px", float: "right" }}
                      src={pic}
                      alt=""
                    />

                  </figure>

                </>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={request.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
    </div>
  );
};

export default Resistration;
