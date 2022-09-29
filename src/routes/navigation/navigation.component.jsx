import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { ReactComponent as Logo } from '../../assets/queen-crown-svgrepo-com.svg'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles.jsx'
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
  //Need current user to show sign in/sign out link
  const { currentUser } = useContext(UserContext)
  //when user signs out, auth state change listener is going to catch it
  console.log(currentUser)  
  const { isCartOpen } = useContext(CartContext)

  return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to="/">
            <Logo className="logo" />
          </LogoContainer>
          <NavLinks>
            <NavLink to="/shop">
                SHOP
            </NavLink>
            { currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ): (<NavLink to="/auth">
                SIGN IN
            </NavLink>
            )}
            <CartIcon />
          </NavLinks>
          {
            isCartOpen && <CartDropdown />
          }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation