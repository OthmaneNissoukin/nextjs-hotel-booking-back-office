import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return <ModalContext.Provider value={{ open, close, isOpen }}>{children}</ModalContext.Provider>;
}

function ToggleOpen({ children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open() });
}

function ToggleClose({ children }) {
  const { close } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => close() });
}

function Overlay({ children }) {
  const { isOpen } = useContext(ModalContext);
  if (!isOpen) return;

  return createPortal(children, document.body);
}

function Wrapper({ children }) {
  return (
    <div className="absolute top-0 left-0 w-full h-[100dvh] flex justify-center items-center z-60">
      <div className="backdrop-blur-sm backdrop-brightness-50 w-full h-full">{children}</div>
    </div>
  );
}

Modal.ToggleOpen = ToggleOpen;
Modal.ToggleClose = ToggleClose;
Modal.Overlay = Overlay;
Modal.Wrapper = Wrapper;

export default Modal;
