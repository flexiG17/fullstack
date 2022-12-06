import styles from './RadioButton.module.scss'
import React, {useState} from "react";

export default function CustomRadioButton(props) {
    const [checked, setChecked] = useState(false)

    return (
        <div className={
            `${!props.disabled ? `${checked ? styles.text_field_checked : styles.text_field}` : styles.text_field_disabled}`}
             onClick={() => {
                 !props.disabled ?
                     checked ? setChecked(false) : setChecked(true) : ''
             }}>
            <div className={styles.radio}>
                <div
                    className={`${!props.disabled ? `${checked ? styles.radio_checked : styles.radio_outer}` : styles.radio_outer_disabled}`}
                    onClick={() => {
                        !props.disabled ?
                            checked ? setChecked(false) : setChecked(true) : ''
                    }}>
                    {checked &&
                        <div className={`${styles.radio_outer_dot}`}>
                        </div>
                    }
                </div>
                <div className={styles.text_position}
                     onClick={() => {
                         !props.disabled ?
                             checked ? setChecked(false) : setChecked(true) : ''
                     }}>
                    <div className={styles.text_style}>
                        {props.text}
                    </div>
                </div>
            </div>
        </div>
    )
}