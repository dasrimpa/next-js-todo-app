"use client";

import { ToastContainer } from "react-toastify";
import TodoLayout from "./todo/layout";
import TodoForm from "./todo/page";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <TodoLayout>
        <TodoForm />
      </TodoLayout>
    </>
  );
}
