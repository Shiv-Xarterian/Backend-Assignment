import axios from "axios";
import React, { useState } from "react";

const ProtectedPage = () => {
  const [validUser, setValidUser] = useState(false);
  const HandleCheckValidity = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/protected", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (res.data.Error) throw new Error(res.data.Error);
      setValidUser(true);
      console.log(res.data.Message);
    } catch (error) {
      setValidUser(false);
      if (error.response.data.Error) console.log(error.response.data.Error);
      else {
        error.response.data.Errors.map((item) => {
          console.log(`${item.msg} of ${item.path}`);
        });
      }
    }
  };
  return (
    <div className="Outer_Box">
      <span> You are:-</span>
      <span>{validUser ? "Authorized User" : "UnAunthorized User"}</span>
      <button onClick={HandleCheckValidity}>Check</button>
    </div>
  );
};

export default ProtectedPage;
