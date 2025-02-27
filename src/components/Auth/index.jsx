/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import styles from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../rtk/Slices/AuthSlice'; // Import the login action

const Auth = ({ isLogin, toggleAuth }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  // const { isAuthenticated } = useSelector((state) => state.auth); // Get authentication state

  const validationSchema = Yup.object({
    ...(isLogin
      ? {
          email: Yup.string()
            .email('Invalid email format')
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email domain')
            .required('Email is required.'),
        }
      : {
          username: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required.'),
          email: Yup.string()
            .email('Invalid email format')
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email domain')
            .required('Email is required.'),
        }),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required.'),
    ...(isLogin
      ? {}
      : {
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required.'),
        }),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (isLogin) {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
          toast.error('User not registered. Please sign up first.', { position: 'top-center' });
        } else if (storedUser.email === values.email && storedUser.password === values.password) {
          // Dispatch the login action with user data
          dispatch(login({ email: values.email, name: storedUser.username }));
          toast.success('Login successful!', { position: 'top-center' });
          setTimeout(() => navigate('/'), 1500); // Redirect to home page
        } else {
          toast.error('Invalid credentials. Please try again.', { position: 'top-center' });
        }
      } else {
        localStorage.setItem('user', JSON.stringify(values));
        toast.success('Registration successful! Redirecting to login...', { position: 'top-center' });
        setTimeout(() => toggleAuth(), 1500); // Switch to login after delay
      }
    },
  });

  const togglePassword = () => {
    setHidePassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setHideConfirmPassword((prev) => !prev);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={formik.handleSubmit} className={styles.form} style={{ maxWidth: '600px', alignItems: 'flex-start' }}>
        <h1>{isLogin ? 'Welcome Back' : 'Register'}</h1>
        {!isLogin && (
          <div className={styles.fieldWrap} style={{ textAlign: 'left' }}>
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
        )}
        <div className={styles.fieldWrap} style={{ textAlign: 'left' }}>
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
        <div className={styles.fieldWrap} style={{ textAlign: 'left', position: 'relative' }}>
          <label>Password</label>
          <input
            type={hidePassword ? 'password' : 'text'}
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
        {!isLogin && (
          <div className={styles.fieldWrap} style={{ textAlign: 'left', position: 'relative' }}>
            <label>Confirm Password</label>
            <input
              type={hideConfirmPassword ? 'password' : 'text'}
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
        )}
        <div className={styles.fieldWrap} style={{ marginBottom: '0' }}>
          <button type="submit" className={styles.button}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
        <p className={styles.switch} onClick={toggleAuth}>
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
        </p>
      </form>
    </>
  );
};

export default Auth;


