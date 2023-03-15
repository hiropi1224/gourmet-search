import { CustomNextPage } from 'next';
import { Layout } from '@/common/components/Layout';
import { SearchList } from '@/features/search/page/SearchList';

const Home: CustomNextPage = () => {
  return (
    <Layout>
      <SearchList />
    </Layout>
  );
};

export default Home;
