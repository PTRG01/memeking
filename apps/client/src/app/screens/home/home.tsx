import { FeedProvider } from '../../contexts/feed-provider/feed-provider';
import Feed from '../feed/feed';
import Signin from '../signin/signin';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return <Signin />;
}

export default Home;
