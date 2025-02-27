import React from "react";
import ProtectedRoute from "../components/protectedRoute";


const CreateAccountPage = () => {
  return (
    <ProtectedRoute>
      <div className="container mt-5">
        <h1>Create Account</h1>
        <p>Welcome! You can create an account here.</p>
        {/* Add your account creation form here */}
      </div>
    </ProtectedRoute>
  );
};

export default CreateAccountPage;