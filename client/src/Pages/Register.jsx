import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

function Register() {
  const [UserName, setuserName] = useState("");
  const [UserPassword, setuserPassword] = useState("");
  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/register", {
        UserName,
        UserPassword,
      });

      if (res.data.success == true) {
        console.log(res.data.Message);
        localStorage.setItem("token", res.data.Token);
        setuserName("");
        setuserPassword("");
      } else {
        throw new Error(res.data.Error);
      }
    } catch (error) {
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
      <form onSubmit={HandleForm} className="form">
        <span>Register</span>
        <input
          className="input"
          placeholder="Enter UserName"
          value={UserName}
          onChange={(e) => setuserName(e.target.value)}
          type="text"
        />
        <input
          className="input"
          placeholder="Enter Password"
          onChange={(e) => setuserPassword(e.target.value)}
          value={UserPassword}
          type="text"
        />
        <button type="submit">Send</button>
        <Link to="/">
          <span>Go to Login Page</span>
        </Link>
      </form>
      <Link to="/protected">
        <button>Check Validity</button>
      </Link>
    </div>
  );
}

export default Register;
