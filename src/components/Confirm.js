
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "../css/Confirm.module.scss";

const cx = classNames.bind(styles);

function Confirm({ onClick, confirm, action }) {
    return (
        <div className={cx('content')}>
            <button id={cx('exit')} onClick={onClick}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3>Bạn muốn {action}?</h3>
            <div className={cx('btn')}>
                <button onClick={() => {
                    confirm()
                    onClick()
                }}>Xác nhận</button>
                <button onClick={onClick}>Hủy</button>
            </div>
        </div>
    );
}

export default Confirm;