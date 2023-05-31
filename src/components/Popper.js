
import classNames from "classnames/bind";
import styles from '../css/Popper.module.scss'

const cx = classNames.bind(styles)

function Popper({ children }) {
    return (
        <nav className={cx('popper-wrapper')}>{children}</nav>
    );
}

export default Popper;