// frontend/src/ProtectedRoute.jsx
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return (
    <SignedIn>
      {children}
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </SignedIn>
  );
};

export default ProtectedRoute;
