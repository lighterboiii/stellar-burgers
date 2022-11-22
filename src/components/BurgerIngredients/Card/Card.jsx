import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import styles from './Card.module.css';

function Card({ image, alt, price, count }) {
  return (
    <li className={'mt-6 mb-6 ml-4 ' + styles.listItem}>
      <Counter count={count} size={'default'} />
      <img src={image} alt={alt} className={'mr-4 ml-4'} />
      <p className={'mt-1 mb-2 text text_type_digits-default text_color_primary ' + styles.paragraph}>
        <span className={'pr-2'}>{price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={'text text_type_main-default text_color_primary ' + styles.bunName}>
        {alt}
      </p>
    </li>
  );
}
export default Card;