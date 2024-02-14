/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import style from "./signup.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    if (!username || !email || !password) {
      alert("Please fill all the fields");
    } else {
      try {
        console.log("try");
        const res = axios.post("http://localhost:5000/api/signup", {
          name: username,
          email: email,
          password: password,
        });
        console.log("res", res);
        console.log("res.data", res.data.message);
        router.push("/login");
      } catch (error) {
        console.log("error");
        alert("Invalid credentials", error);
      }
    }
  };
  return (
    <div className={style.App}>
      <div>
        <p
          style={{
            color: "white",
            fontSize: "50px",
            textAlign: "center",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        >
          CRUD-OPERATIONS
        </p>
      </div>
      <div className={style.auth_container}>
        <div className={style.text1}>Signup</div>

        <label className={style.label}>
          Username:
          <input
            type="text"
            value={username}
            className={style.input}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className={style.label}>
          E-mail:
          <input
            type="email"
            value={email}
            className={style.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className={style.label}>
          Password:
          <input
            type="password"
            value={password}
            className={style.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* <label className={style.label}>
            Password:
            <input
              type="password"
              value={password}
              className={style.input}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label> */}
        <button onClick={handleSubmit} className={style.button}>
          Signup
        </button>

        <p onClick={handleToggle} className={style.pot}>
          Already have an account?
          <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
