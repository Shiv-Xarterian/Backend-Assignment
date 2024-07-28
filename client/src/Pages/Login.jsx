import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

function Login() {
  const [UserName, setuserName] = useState("");
  const [UserPassword, setuserPassword] = useState("");
  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:4000/api/login", {
        UserName,
        UserPassword,
      });

      if (data.success == true) {
        localStorage.setItem("token", data.Token);
        console.log(data.Message);
        setuserName("");
        setuserPassword("");
      } else {
        throw new Error(data.Error);
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
        <span>Login</span>
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
        <Link to="/register">
          <span>Go to Register Page</span>
        </Link>
      </form>
      <Link to="/protected">
        <button>Check Validity</button>
      </Link>
    </div>
  );
}

export default Login;
