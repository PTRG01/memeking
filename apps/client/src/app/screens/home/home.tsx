import { FeedProvider } from '../../contexts/feed-provider/feed-provider';
import Feed from '../feed/feed';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <FeedProvider>
      <Feed />
    </FeedProvider>
  );
}

export default Home;
