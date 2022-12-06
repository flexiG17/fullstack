import styles from "./CheckButton.module.scss";
import React from "react";
import dotPic from '../images/dot.svg';
import Image from "next/image";

export function CheckButton(props) {
    const [checkedStyle, setCheckedStyle] = React.useState(styles.checkButton);

    return (
        <div className={`${props.disabled ? styles.checkButton_disabled : checkedStyle}`}
             onClick={() => setCheckedStyle(styles.checkButton_active)}>
            <div className={styles.checkButton__frame}>
                <div className={styles.checkButton__frame_check}>
                    <div className={styles.checkButton__frame_check_out}>
                        <Image className={styles.checkButton__frame_check_out} src={dotPic} layout={"fill"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}