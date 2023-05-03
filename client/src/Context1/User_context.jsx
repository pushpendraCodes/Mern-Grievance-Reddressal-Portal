import React, { createContext } from "react";
import { useState } from "react";
export const Context = createContext();
import axios from "axios";


const User_context = ({ children }) => {

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [resolved, setresolved] = useState(false);
  const [msg, setmsg] = useState("");



  return (
    <div>
      <Context.Provider value={{  loading,setloading, error,seterror, resolved,setresolved ,msg,setmsg}}>
        {children}
      </Context.Provider>
    </div>
  );
};

export default User_context;
