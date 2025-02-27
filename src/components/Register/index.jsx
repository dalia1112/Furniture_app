import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import styles from "./register.module.css";

const Register = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required."),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values));
      toast.success("Registration successful! Redirecting to login...", { position: "top-center" });
      setTimeout(() => navigate("/login"), 1500);
    },
  });

  // Reset the form when the component mounts
  useEffect(() => {
    formik.resetForm();
  }, []);

  const togglePassword = () => {
    setHidePassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setHideConfirmPassword((prev) => !prev);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={formik.handleSubmit} className={styles.form} style={{ maxWidth: "600px", alignItems: "flex-start" }}>
        <h1>Register</h1>
        <div className={styles.fieldWrap} style={{ textAlign: "left" }}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className={styles.input}
          />
          {formik.touched.username && formik.errors.username && <div className={styles.errors}>{formik.errors.username}</div>}
        </div>
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
        <div className={styles.fieldWrap} style={{ textAlign: "left", position: "relative" }}>
          <label>Confirm Password</label>
          <input
            type={hideConfirmPassword ? "password" : "text"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className={styles.input}
          />
          <svg
            className={styles.eye}
            onClick={toggleConfirmPassword}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {hideConfirmPassword ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 2.5l19 19M22 12s-3.5-5-9-5-9 5-9 5 3.5 5 9 5 9-5 9-5z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5z" />
            )}
          </svg>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className={styles.errors}>{formik.errors.confirmPassword}</div>}
        </div>
        <div className={styles.fieldWrap} style={{ marginBottom: "0" }}>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </div>
        <p className={styles.switch} onClick={() => navigate("/login")}>
          Already have an account? Log in
        </p>
      </form>
    </>
  );
};

export default Register;