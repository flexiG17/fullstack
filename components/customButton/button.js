import styles from './Button.module.scss'

export default function CustomButton(props){
    return (
        <button className={styles.button} disabled={props.disabled}>
            <div className={styles.button__text}> 
                {props.text}
            </div>
        </button>
    )
}