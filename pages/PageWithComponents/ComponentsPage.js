import styles from "./componentPage.module.scss";
import CustomRadioButton from '../../components/customRadioButton/radioButton'
import CustomButton from '../../components/customButton/button'
import {useState} from "react";

export default function ComponentsPage() {
    const [clicked, setClicked] = useState(false)
    let array = [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    return (
        <div className={styles.main_frame}>
            <div className={styles.header}>
                <div className={styles.question_image}>
                    <div className={styles.question_image__text}>
                        8/20
                    </div>
                </div>
                <div className={styles.clock_image}>
                    <div className={styles.clock_image__text}>
                        8/20
                    </div>
                </div>
                <div className={styles.title}>
                    Русь и золотая орда
                </div>
            </div>
            <div className={styles.menu}>
                <div className={styles.menu__arrow}>
                </div>

                <div className={styles.menu__question}>
                    {array.map(value =>
                        // eslint-disable-next-line react/jsx-key
                        <div className={styles.menu__question__container}>
                            <div className={styles.menu__question__container__number}>
                                {value}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.timer}>
                <div className={styles.timer__time_limit}>
                    01:45
                </div>
            </div>
            <div className={styles.text_question}>
                С именем какого князя связано объединение Галицкого и Волынского княжеств?
            </div>
            <div className={styles.answers_block}>
                <div className={styles.answers_block__top} onClick={() => setClicked(!clicked)}>
                    <CustomRadioButton text={'Романа Мстиславича'} disabled={false}/>
                    <CustomRadioButton text={'Андрея Боголюбского'} disabled={false}/>
                </div>
                <div className={styles.answers_block__middle}>
                    <CustomRadioButton text={'Романа Мстиславича'} disabled={false}/>
                    <CustomRadioButton text={'Романа Мстиславича'} disabled={false}/>
                </div>
                <div className={styles.answers_block__bottom}>
                    <CustomButton disabled={false} text={'Пропустить'}/>
                    <CustomButton disabled={!clicked} text={'Ответить'}/>
                </div>
            </div>
        </div>
    )
}