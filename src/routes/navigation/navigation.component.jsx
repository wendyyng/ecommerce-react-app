import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/diamond-ring-jewelry-svgrepo-com.svg'
import { UserContext } from '../../contexts/user.context'
import './navigation.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils'

const Navigation = () => {
  //Need current user to show sign in/sign out link
  const { currentUser } = useContext(UserContext)
  //when user signs out, auth state change listener is going to catch it
  console.log(currentUser)  

  return (
      <Fragment>
        <div className="navigation">
          <Link className='logo-container' to="/">
            <Logo className="logo" />
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
                SHOP
            </Link>
            { currentUser ? (
              <span onClick={signOutUser} className="nav-link">SIGN OUT</span>
            ): (<Link className="nav-link" to="/auth">
                SIGN IN
            </Link>
            )}
          </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation