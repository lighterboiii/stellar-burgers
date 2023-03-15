import { FC } from 'react';
import styles from './ModalOverlay.module.css';

interface IOverlay {
  closePopup: () => void;
}

const ModalOverlay: FC<IOverlay> = ({ closePopup }) => {
  return(
    <div className={styles.overlay} onClick={closePopup} ></div>
  )
};

export default ModalOverlay;