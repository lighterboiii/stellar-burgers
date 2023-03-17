import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import styles from './Modal.module.css'

interface IModal {
  title?: string;
  children: ReactNode;
  closePopup: () => void;
}

export const Modal: FC<IModal> = ({ title, children, closePopup }) => {

  useEffect(() => {
    const handleEscClose = (evt: { key: string }) => {
      if (evt.key === 'Escape') {
        closePopup()
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose); 
    }
  }, [closePopup])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h3 className='pl-10 pt-10 text text_color_primary text_type_main-large'>{title}</h3>
        <span className={styles.close} onClick={closePopup}>
          <CloseIcon type='primary' />
        </span>
        {children}
      </div>
      <ModalOverlay closePopup={closePopup}/>
    </> ,
    document.getElementById('modal-root') as HTMLElement
  )
};