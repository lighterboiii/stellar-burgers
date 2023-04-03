import styles from './profile-feed.module.css';
import { FeedList } from '../../components/FeedList/FeedList';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect, FC } from 'react';
import { getUserInfo } from '../../services/actions/userActions';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';
import { WS_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';

export const ProfileFeedPage: FC = () => {
  
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken")?.split("Bearer ")[1];
  const { orders, error } = useSelector((store) => store.socketReducer);

  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`))
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [])

  useEffect(() => {
    const accessToken = getCookie("accessToken")?.split("Bearer ")[1];
    if (error) {
      dispatch(wsConnectionClosed());
      dispatch(getUserInfo())
        .then(() => dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`)))
        .catch(() => dispatch(wsConnectionClosed()));
    }
  }, [error]);

  return (
    orders &&
    <section className={styles.feed}>
      <FeedList orders={orders.reverse()} />
      {/* <FeedList orders={orders} /> */}
    </section>
  )
};