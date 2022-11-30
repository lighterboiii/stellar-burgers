import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({closePopup}) {
  return(
    <div className={styles.overlay} onClick={() => closePopup(false)} ></div>
  )
}



export default ModalOverlay;