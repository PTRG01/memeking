import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { FeedProvider } from '../../contexts/feed-provider/feed-provider';
import Feed from '../feed/feed';
import HeroHeader from '../../components/header/hero-header';

export function Home() {
  const { isLoggedIn } = useAuthContext();
  return isLoggedIn ? (
    <FeedProvider>
      <Feed groupFeed={false} />
    </FeedProvider>
  ) : (
    <HeroHeader />
  );
}

export default Home;
