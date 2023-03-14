import styles from './profile-feed.module.css';
import { FeedList } from '../../components/FeedList/FeedList';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect, FC } from 'react';
import { getUserInfo } from '../../services/actions/user';
import { IWsMessage, wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';
import { wsUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';

export const ProfileFeedPage: FC = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken")?.split("Bearer ")[1];
  const { error } = useSelector((state) => state.socketReducer);
  const orders = useSelector((state: { socketReducer: IWsMessage } ) => state.socketReducer.orders);
  
  useEffect(() => {
    dispatch(wsConnectionStart(`${wsUrl}?token=${accessToken}`))
  }, [])

  useEffect(() => {
    if (error) {
      dispatch(wsConnectionClosed());
      dispatch(getUserInfo())
        .then(() => dispatch(wsConnectionStart(`${wsUrl}?token=${accessToken}`))) //TODO: починить
        .catch(() => dispatch(wsConnectionClosed()));
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  return (
    orders && 
    <section className={styles.feed}>
      <FeedList orders={orders.reverse()} />
    </section>
  )
};