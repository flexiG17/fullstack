import styles from "./componentPage.module.scss";
import CustomRadioButton from '../../components/customRadioButton/radioButton'
import CustomButton from '../../components/customButton/button'
import {useState} from "react";
import {QUESTIONS_CONST} from '../../consts/questionConsts'

export default function ComponentsPage() {
    const [clicked, setClicked] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(0)

    let currentQuestion = QUESTIONS_CONST[selectedQuestion]
    return (
        <div className={styles.main_frame}>
            <div className={styles.header}>
                <div className={styles.question_image}>
                    <div className={styles.question_image__text}>
                        {`${currentQuestion.number}/${QUESTIONS_CONST.length}`}
                    </div>
                </div>
                <div className={styles.clock_image}>
                    <div className={styles.clock_image__text}>
                        60:00
                    </div>
                </div>
                <div className={styles.title}>
                    {currentQuestion.title}
                </div>
            </div>
            <div className={styles.menu}>
                <div className={styles.menu__arrow}>
                </div>

                <div className={styles.menu__question}>
                    {QUESTIONS_CONST.map(allQuestions =>
                        // eslint-disable-next-line react/jsx-key
                        <div className={styles.menu__question__container}>
                            <div className={styles.menu__question__container__number}
                                 onClick={() => setSelectedQuestion(allQuestions.number - 1)}>
                                {allQuestions.number}
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
                {currentQuestion.question}
            </div>
            <div className={styles.answers_block}>
                <div className={styles.answers_block__top}>
                    <div onClick={() => setClicked(!clicked)}>
                        <CustomRadioButton text={currentQuestion.answers[0]} disabled={false}/>
                    </div>
                    <div onClick={() => setClicked(!clicked)}>
                        <CustomRadioButton text={currentQuestion.answers[1]} disabled={false}/>
                    </div>
                </div>
                <div className={styles.answers_block__middle}>
                    <div onClick={() => setClicked(!clicked)}>
                        <CustomRadioButton text={currentQuestion.answers[2]} disabled={false}/>
                    </div>
                    <div onClick={() => setClicked(!clicked)}>
                        <CustomRadioButton text={currentQuestion.answers[3]} disabled={false}/>
                    </div>
                </div>
                <div className={styles.answers_block__bottom}>
                    <div
                        onClick={() => {
                            setSelectedQuestion(currentQuestion.number !== QUESTIONS_CONST.length ? selectedQuestion + 1 : 0)
                        }}>
                        <CustomButton disabled={false} text={'Пропустить'}/>
                    </div>
                    <CustomButton disabled={!clicked} text={'Ответить'}/>
                </div>
            </div>
        </div>
    )
}