import { Navigate } from "react-router";
import { useAuth } from "../utilis/constants";
import { useContext, useEffect } from "react";
import ModalContext from "../contexts/ModalContext";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const { setModal } = useContext(ModalContext);

  useEffect(() => {
    if (!currentUser) {
      setModal(true);
    }
  }, [currentUser, setModal]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;