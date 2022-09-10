import './App.css';
import Categories from './components/categories/categories.component'
import categories from './components/categories/categories';

const App = () =>  {

  return (
    <Categories categories ={categories}/>
  );
}

export default App;
