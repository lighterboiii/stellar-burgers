import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import styles from './Modal.module.css'

const Modal = ({ title, children, closePopup }) => {

  useEffect(() => {
    const hanldeEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closePopup(false)
      }
    }
    document.addEventListener('keydown', hanldeEscClose);
    return () => {
      document.removeEventListener('keydown', hanldeEscClose);  {/* отписка от обработчика событий */}
    }
  }, [closePopup])

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <h3 className='pl-10 pt-10 text text_color_primary text_type_main-large'>{title}</h3>
        <span className={styles.close} onClick={() => closePopup(false)}>
          <CloseIcon type='primary' />
        </span>
        {children}
      </div>
      <ModalOverlay closePopup={closePopup}/>
    </> ,
    document.getElementById('modal-root')
  )
}

export default Modal;