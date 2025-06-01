import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './BaseLayout.module.css'
import Navigation from '../../components/Navigation/Navigation';

const BaseLayout = () => {
    return <div className={styles.BaseLayout}>
        <Navigation />
        <main>
            <Outlet />
        </main>
    </div>
}

export default BaseLayout;