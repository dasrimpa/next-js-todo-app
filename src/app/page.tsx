"use client";

import { ToastContainer } from "react-toastify";

import Login from "./auth/login/page";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Login />
    </>
  );
}
