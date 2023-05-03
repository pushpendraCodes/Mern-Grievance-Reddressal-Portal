import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "./layouts";



import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { Context } from "./Context1/User_context";
import { useEffect } from "react";

function App() {
  const {  resolved, msg } = useContext(Context);


  let success_msg = () => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };


  useEffect(() => {
    if (resolved === true) {
      success_msg();
    }
  }, [resolved === true]);



  return (

<>


    {/* <Provider store={store}> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="/dashboard"
          element={<Navigate to="/dashboard/home" replace />}
        />
        <Route
          path="/dashboard/*"
          element={<Navigate to="/dashboard/home" replace />}
        />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    {/* </Provider> */}
    </>
  );
}

export default App;
