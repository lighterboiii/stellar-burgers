import styles from './profile-feed.module.css';
import { FeedList } from '../../components/FeedList/FeedList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { wsConnectionStart } from '../../services/actions/wsActions';
import { wsUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';

export function ProfileFeedPage() {
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    dispatch(wsConnectionStart(`${wsUrl}?token=${accessToken}`))
  }, [dispatch])

  const orders = useSelector((state) => state.socketReducer.orders);

  return (
    <section className={styles.feed}>
      <FeedList orders={orders} />
    </section>
  )
}