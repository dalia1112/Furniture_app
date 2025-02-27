import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import styles from "../Auth/Auth.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../rtk/Slices/AuthSlice";

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email domain")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        toast.error("User not registered. Please sign up first.", { position: "top-center" });
      } else if (storedUser.email === values.email && storedUser.password === values.password) {
        // Include username in the login action
        dispatch(login({ email: values.email, username: storedUser.username }));
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error("Invalid credentials. Please try again.", { position: "top-center" });
      }
    },
  });

  const togglePassword = () => {
    setHidePassword((prev) => !prev);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={formik.handleSubmit} className={styles.form} style={{ maxWidth: "600px", alignItems: "flex-start" }}>
        <h1>Welcome Back</h1>
        <div className={styles.fieldWrap} style={{ textAlign: "left" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={styles.input}
          />
          {formik.touched.email && formik.errors.email && <div className={styles.errors}>{formik.errors.email}</div>}
        </div>
        <div className={styles.fieldWrap} style={{ textAlign: "left", position: "relative" }}>
          <label>Password</label>
          <input
            type={hidePassword ? "password" : "text"}
            name="password"
            placeholder="Enter Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={styles.input}
          />
          <svg
            className={styles.eye}
            onClick={togglePassword}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {hidePassword ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 2.5l19 19M22 12s-3.5-5-9-5-9 5-9 5 3.5 5 9 5 9-5 9-5z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5z" />
            )}
          </svg>
          {formik.touched.password && formik.errors.password && <div className={styles.errors}>{formik.errors.password}</div>}
        </div>
        <div className={styles.fieldWrap} style={{ marginBottom: "0" }}>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
        <p className={styles.switch} onClick={() => navigate("/register")}>
          Need an account? Sign up
        </p>
      </form>
    </>
  );
};

export default Login;