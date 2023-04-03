import styles from './profile-feed.module.css';
import { FeedList } from '../../components/FeedList/FeedList';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect, FC } from 'react';
import { getUserInfo } from '../../services/actions/userActions';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';
import { WS_URL_PROFILE } from '../../utils/constants';

export const ProfileFeedPage: FC = () => {
  const dispatch = useDispatch();
  const { orders, error } = useSelector((store) => store.socketReducer);

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_PROFILE))
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [])

  useEffect(() => {
    if (error) {
      dispatch(wsConnectionClosed());
      dispatch(getUserInfo())
        .then(() => dispatch(wsConnectionStart(WS_URL_PROFILE)))
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