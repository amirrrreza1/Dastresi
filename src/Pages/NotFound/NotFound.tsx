import { NavLink } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black">
      <div className={styles.content}>
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%">
              404
            </text>
          </symbol>

          <g className="g-ants">
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
            <use xlinkHref="#s-text" className={styles.text}></use>
          </g>
        </svg>

        <h1 className={styles.h1}>Page Not Found</h1>
        <NavLink to="/" className={styles.link}>
          Go to Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
