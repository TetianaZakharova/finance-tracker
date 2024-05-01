import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogOut';
import { useAuthContext } from '../../hooks/useAuthContext'

//styles
import styles from './navbar.module.css';

export const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>
                    My Money App
                </li>
                {!user
                    ? <li>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Sign Up</Link>
                    </li>
                    : <Fragment>
                        <li>Hello, {user.displayName}</li>
                        <li>
                            <button
                                className='btn'
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </Fragment>
                }

            </ul>
        </nav>
    )
}
