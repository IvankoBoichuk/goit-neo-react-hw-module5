import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from './BaseLayout.module.css'

const BaseLayout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return <div className={styles.BaseLayout}>
        <nav>
            <ul>
                <li><NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/">Home</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/movies">Movies</NavLink></li>
            </ul>
        </nav>
        <main>
            {pathname != "/" && <button onClick={() => navigate(-1)}>
                ← Back
            </button>}
            <Outlet />
        </main>
    </div>
}

export default BaseLayout;