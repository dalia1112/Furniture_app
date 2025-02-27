;

import AddProjectForm from "./addProjectForm";
import ProtectedRoute from "../components/protectedRoute";

const AddProjectPage = () => {
  return (
    <ProtectedRoute>
      <AddProjectForm />
    </ProtectedRoute>
  );
};

export default AddProjectPage;