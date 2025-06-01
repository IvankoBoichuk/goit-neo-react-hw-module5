import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css"

const Navigation = () => {
    return <nav>
        <ul>
            <li><NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/">Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} to="/movies">Movies</NavLink></li>
        </ul>
    </nav>
}

export default Navigation;