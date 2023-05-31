
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from '../css/Popper.module.scss'

const cx = classNames.bind(styles)

function PopperItem({ title, to, icon }) {
    return (
        <Link className={cx('popper-item')} to={to} >
            {icon}
            <span className={cx('title')}>{title}</span>
        </Link>
    );
}

export default PopperItem;