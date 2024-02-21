import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[]);

    const collectData = async () => {
        console.log(name, email, password);

        let result = await fetch('http://localhost:8000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        result = await result.json();
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));

        if (result) {
            navigate('/');
        }

        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" className="inputelement"
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name" />

            <input type="text" className="inputelement"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email" />

            <input type="password" className="inputelement"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password" />

            <button type="button" className="signUpButton" onClick={collectData}>
                Sign Up
            </button>
        </div>
    )
}

export default SignUp;