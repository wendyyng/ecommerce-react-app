import {Routes, Route } from 'react-router-dom'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { useEffect} from 'react'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils'
// import { createAction } from '../utils/reducer/reducer.utils'
import { setCurrentUser } from './store/user/user.action'
import { useDispatch } from 'react-redux'

const App = () =>  {
  //dispatch doesn't get updated/changed, only one dispatch in redux
  const dispatch = useDispatch();

     //run once when component mounts
    useEffect(() => {
        //Centralize sign in and sign out into the listener callback
        const unsubscribe = onAuthStateChangedListener((user) => {
            //when the listener mounts, check the authentication state automatically when you
            //initialize the listener
            if(user){
                createUserDocumentFromAuth(user);
            }
            //the user that passes through: either unauthenticated user object/ null (user signs out)
            dispatch(setCurrentUser(user));
            console.log(user);
        })
        //Unsubscribe when it unmounts
        return unsubscribe;
    }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* *means wild card to match anything */}
        <Route path='/shop/*' element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
