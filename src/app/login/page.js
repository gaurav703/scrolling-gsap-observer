/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { useState, useEffect } from "react";
import style from "./login.module.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setAuthentication, isLogin } from "../utils/auth";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/home");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, []);
  console.log("pageReady", pageReady);

  const handleSubmit = async (e) => {
    // Add your authentication logic here
    console.log("email", email);
    console.log("password", password);

    if (!email || !password) {
      alert("Please fill all the fields");
    } else {
      try {
        console.log("try");
        const res = await axios.post("http://localhost:5000/api/login", {
          email: email,
          password: password,
        });
        console.log("res", res);
        console.log("res.data", res.data.token);
        setAuthentication(res.data.token);
        router.push("/home");
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
        <p className={style.text1}>Login</p>

        <label className={style.label}>
          E-mail:
          <input
            type="email"
            value={email}
            className={style.input}
            onChange={(e) => setEmail(e.target.value)}
            //required
          />
        </label>
        <label className={style.label}>
          Password:
          <input
            type="password"
            value={password}
            className={style.input}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        <button onClick={handleSubmit} className={style.button}>
          Login
        </button>
        <p className={style.pot}>
          Don&apos;t have an account?
          <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
