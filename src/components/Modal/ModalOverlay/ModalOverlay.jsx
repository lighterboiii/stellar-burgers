import styles from './ModalOverlay.module.css';

function ModalOverlay({closePopup}) {
  return(
    <div className={styles.overlay} onClick={() => closePopup(false)} ></div>
  )
}




export default ModalOverlay;