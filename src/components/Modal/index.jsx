import { cloneElement, createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const ModalContext = createContext();

function escListener(e, close) {
  if (e.key.toLowerCase() === "escape") close();
}

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const open = (key) => {
    setIsOpen(true);
    setActiveModal(key);
  };
  const close = () => setIsOpen(false);

  useEffect(() => {
    document.addEventListener("keyup", (e) => escListener(e, close));

    return () => document.removeEventListener("keyup", (e) => escListener(e, close));
  }, []);

  return <ModalContext.Provider value={{ open, close, isOpen, activeModal }}>{children}</ModalContext.Provider>;
}

function ToggleOpen({ children, modalKey }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      open(modalKey);
      children.props?.handleClick?.();
    },
  });
}

function ToggleClose({ children }) {
  const { close } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      close();
    },
  });
}

function Overlay({ children, modalKey }) {
  const { isOpen, activeModal } = useContext(ModalContext);
  if (isOpen && modalKey == activeModal) return createPortal(children, document.body);

  return;
}

function Wrapper({ children }) {
  return (
    <div className="absolute top-0 left-0 w-full h-[100dvh] flex justify-center items-center z-60">
      <div className="backdrop-blur-sm backdrop-brightness-90 w-full h-full ">{children}</div>
    </div>
  );
}

Modal.ToggleOpen = ToggleOpen;
Modal.ToggleClose = ToggleClose;
Modal.Overlay = Overlay;
Modal.Wrapper = Wrapper;

export default Modal;
