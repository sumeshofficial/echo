import { useState } from "react";
import ModalContext from "./ModalContext";

export const ModalProvider = ({ children }) => {
  const [showModal, setModal] = useState(false);

  const onClose = () => setModal(false);

  return (
    <ModalContext.Provider value={{ showModal, setModal, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};