import styles from "./componentPage.module.scss";
import CustomRadioButton from '../../components/customRadioButton/radioButton'
import CustomButton from '../../components/customButton/button'
import {useEffect, useState} from "react";
import {QUESTIONS_CONST} from '../../consts/questionConsts'
import {useRouter} from "next/router";
import {getAllQuestions} from "../../requests/request";
import {Backdrop, CircularProgress} from "@mui/material";

export default function TestNumber() {
    const [clicked, setClicked] = useState(false)
    const [testQuestions, setTestQuestions] = useState(QUESTIONS_CONST[0])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getAllQuestions()
            .then(data => {
                setTestQuestions(data)

                setLoading(false)
            })
    }, [])

    const router = useRouter();
    const {testNumber} = router.query;

    const currentQuestion = testQuestions.questions[testNumber]
    return (
        <>
            {isLoading &&
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isLoading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>}

            {!isLoading && <div className={styles.main_frame}>
                <div className={styles.header}>
                    <div className={styles.question_image}>
                        <div className={styles.question_image__text}>
                            {`${currentQuestion.number}/${testQuestions.questions.length}`}
                        </div>
                    </div>
                    <div className={styles.clock_image}>
                        <div className={styles.clock_image__text}>
                            {currentQuestion.timeLimit}
                        </div>
                    </div>
                    <div className={styles.title}>
                        {testQuestions.title}
                    </div>
                </div>
                <div className={styles.menu}>
                    <div className={styles.menu__arrow}>
                    </div>

                    <div className={styles.menu__question}>
                        {testQuestions.questions.map(allQuestions =>
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.menu__question__container}>
                                <div className={styles.menu__question__container__number}
                                     onClick={() => router.push(`/test/${allQuestions.number}`)}>
                                    {allQuestions.number}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.timer}>
                    <div className={styles.timer__time_limit}>
                        {currentQuestion.timeLimit}
                    </div>
                </div>
                <div className={styles.text_question}>
                    {currentQuestion.text}
                </div>
                <div className={styles.answers_block}>
                    <div className={styles.answers_block__top}>
                        <div onClick={() => setClicked(!clicked)}>
                            <CustomRadioButton text={currentQuestion.answers[0].text} disabled={false}/>
                        </div>
                        <div onClick={() => setClicked(!clicked)}>
                            <CustomRadioButton text={currentQuestion.answers[1].text} disabled={false}/>
                        </div>
                    </div>
                    <div className={styles.answers_block__middle}>
                        <div onClick={() => setClicked(!clicked)}>
                            <CustomRadioButton text={currentQuestion.answers[2].text} disabled={false}/>
                        </div>
                        <div onClick={() => setClicked(!clicked)}>
                            <CustomRadioButton text={currentQuestion.answers[3].text} disabled={false}/>
                        </div>
                    </div>
                    <div className={styles.answers_block__bottom}>
                        <div
                            onClick={() => router.push(`/test/${currentQuestion.number !== testQuestions.questions.length - 1 ? currentQuestion.number + 1 : 0}`)}>
                            <CustomButton disabled={false} text={'Пропустить'}/>
                        </div>
                        <CustomButton disabled={!clicked} text={'Ответить'}/>
                    </div>
                </div>
            </div>}
        </>
    )
}