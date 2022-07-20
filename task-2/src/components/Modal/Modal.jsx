import React from "react";
import Button from "../Button/Button";
import cl from "./Modal.module.css";

const Modal = ({ children, visible, close }) => {
  return (
    <div className={[cl.background, visible ? "" : cl.invisible].join(" ")}>
      <div className={cl.content}>
        <img src={children} alt="" />
        <Button
          onClick={() => {
            close();
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
