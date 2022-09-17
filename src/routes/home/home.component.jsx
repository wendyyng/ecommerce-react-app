import categories from '../../components/directory/categories';
import Directory from '../../components/directory/directory.component';
import { Outlet } from 'react-router-dom';

const Home = () =>  {

  return (
     <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
}

export default Home;
