
import classNames from "classnames/bind";
import styles from '../css/PopupModal.module.scss';

const cx = classNames.bind(styles);

function PopupModal({ content, onClick }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('overlay')} onClick={onClick}></div>
            <div className={cx('modal-content')}>
                {content}
            </div>
        </div>
    );
}

export default PopupModal;