import styles from './orders-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function OrdersListPage() {
  return (
    <section className={styles.feed + ' custom-scroll'}>
    <div className={styles.orders + ' mr-2'}>
      <article className={styles.order}>
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>#30463</p>
          <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <h3 className={'text text_type_main-medium mb-6'}>Death Star Starship Main бургер</h3>
        <div className={styles.info}>
          <img src="" alt="Картинки там всякие" />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>400{<CurrencyIcon />}</span>
        </div>
      </article>
      <article className={styles.order}>
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>#30462</p>
          <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 12:30 i-GMT+3</p>
        </div>
        <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
        <div className={styles.info}>
          <img src="" alt="Картинки там всякие" />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>518{<CurrencyIcon />}</span>
        </div>
      </article>
      <article className={styles.order}>
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>#30461</p>
          <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 10:00 i-GMT+3</p>
        </div>
        <h3 className={'text text_type_main-medium mb-6'}>Supernova Infinity бургер</h3>
        <div className={styles.info}>
          <img src="" alt="Картинки там всякие" />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>370{<CurrencyIcon />}</span>
        </div>
      </article>
      <article className={styles.order}>
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>#30460</p>
          <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 9:20 i-GMT+3</p>
        </div>
        <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
        <div className={styles.info}>
          <img src="" alt="Картинки там всякие" />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>518{<CurrencyIcon />}</span>
        </div>
      </article>
      <article className={styles.order}>
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>#30459</p>
          <p className={"text text_color_inactive text_type_main-default "}>Сегодня, 9:14 i-GMT+3</p>
        </div>
        <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
        <div className={styles.info}>
          <img src="" alt="Картинки там всякие" />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>518{<CurrencyIcon />}</span>
        </div>
      </article>
      <article className={styles.order}>
        <div className={styles.info + ' mb-6'}>
          <p className={'text text_type_digits-default'}>#30458</p>
          <p className={"text text_color_inactive text_type_main-default "}>Вчера, 21:41 i-GMT+3</p>
        </div>
        <h3 className={'text text_type_main-medium mb-6'}>Black Hole Singularity острый бургер</h3>
        <div className={styles.info}>
          <img src="" alt="Картинки там всякие" />
          <span className={'text text_type_digits-medium mr-10 ' + styles.sum}>518{<CurrencyIcon />}</span>
        </div>
      </article>
    </div>
  </section>
  )
}