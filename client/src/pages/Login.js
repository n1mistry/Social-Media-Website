import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext); 

    let navigate = useNavigate();

    //post login data
    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then ((response) => {
            if (response.data.error) {  //if else statement that only creates session variable if the login is successful
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({username: response.data.username, id: response.data.id, status: true });
                navigate("/");
                
            }
        });
    };

    //form for logging in
  return (
    <div className="loginCon">
        <label>Username:</label>
        <input 
            type="text"
            onChange={(event) => {
                setUsername(event.target.value);
            }}    
        />

        <label>Password:</label>
        <input 
            type="password"
            onChange={(event) => {
                setPassword(event.target.value);
            }}    
        />
        <button onClick={login}> Login </button>
    </div>
  )
}

export default Login