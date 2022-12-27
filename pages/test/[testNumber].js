import styles from "./componentPage.module.scss";
import CustomRadioButton from '../../components/customRadioButton/radioButton'
import CustomButton from '../../components/customButton/button'
import {useEffect, useState} from "react";
import {QUESTIONS_CONST} from '../../consts/questionConsts'
import {useRouter} from "next/router";
import {getAllQuestions} from "../../requests/request";
import {Backdrop, CircularProgress} from "@mui/material";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

export default function TestNumber() {
    const router = useRouter()
    const {testNumber} = router.query;

    const [selectedAnswer, setSelectedAnswer] = useState(false)
    const [clickedNumberRadioButton, setClickedNumberRadioButton] = useState(null)
    const [testQuestions, setTestQuestions] = useState(QUESTIONS_CONST[0])
    const [loading, setLoading] = useState(true)
    const [endOfTimer, setEndOfTimer] = useState(false)

    const handleSkipQuestion = () => {
        setLoading(true)
        setTimeout(() => {
            router.push(`/test/${currentQuestion.number !== testQuestions.questions.length - 1 ? currentQuestion.number + 1 : 0}`)
            //router.reload()
            setClickedNumberRadioButton(null)
            setSelectedAnswer(false)
            setLoading(false)
            setEndOfTimer(false)
        }, 500)
    }

    const handleChooseQuestion = (currentQuestion) => {
        setLoading(true)
        setTimeout(() => {
            router.push(`/test/${currentQuestion.number}`)
            //router.reload()
            setClickedNumberRadioButton(null)
            setSelectedAnswer(false)
            setLoading(false)
            setEndOfTimer(false)
        }, 500)
    }


    useEffect(() => {
        getAllQuestions()
            .then(data =>{
                setTestQuestions(data)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }, [])
    const renderTime = ({remainingTime}) => {
        if (remainingTime === 0) {
            return <div className={styles.timer__time_limit}>Конец</div>;
        }

        return (
            <div className="timer">
                <div className={styles.timer__time_limit}>{remainingTime}</div>
            </div>
        );
    }
    const currentQuestion = testQuestions.questions[testNumber]
    if (loading)
        return (
            <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={true} invisible={true}>
                <CircularProgress style={{'color': '#00EAD9'}}/>
            </Backdrop>
        )
    else
        return (
            <>
                <div className={styles.main_frame}>
                    <div className={styles.header}>
                        <div className={styles.question_image}>
                            <div className={styles.question_image__text}>
                                {`${currentQuestion.number + 1}/${testQuestions.questions.length}`}
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
                            {testQuestions.questions.map(currentQuestion =>
                                // eslint-disable-next-line react/jsx-key
                                <div className={styles.menu__question__container}>
                                    <div className={styles.menu__question__container__number}
                                         onClick={() => {
                                             handleChooseQuestion(currentQuestion)
                                         }
                                         }>
                                        {currentQuestion.number + 1}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.timer}>
                        <CountdownCircleTimer
                            strokeWidth={2}
                            trailStrokeWidth={0}
                            trailColor='#FFFFFF'
                            size={120}
                            isPlaying={true}
                            duration={currentQuestion.timeLimit}
                            colors="#00EAD9"
                            onComplete={() => {
                                setEndOfTimer(true)
                            }}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                        {/*<div className={styles.timer__time_limit}>
                            {currentQuestion.timeLimit}
                        </div>*/}
                    </div>
                    <div className={styles.text_question}>
                        {currentQuestion.text}
                    </div>
                    <div className={styles.answers_block}>
                        <div className={styles.answers_block__top}>
                            <div onClick={() => {
                                if (!selectedAnswer && !endOfTimer) {
                                    setSelectedAnswer(true)
                                    setClickedNumberRadioButton(0)
                                } else if (selectedAnswer && clickedNumberRadioButton === 0) {
                                    setSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[0].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 0}/>
                            </div>
                            <div onClick={() => {
                                if (!selectedAnswer && !endOfTimer) {
                                    setSelectedAnswer(true)
                                    setClickedNumberRadioButton(1)
                                } else if (selectedAnswer && clickedNumberRadioButton === 1) {
                                    setSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[1].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 1}/>
                            </div>
                        </div>
                        <div className={styles.answers_block__middle}>
                            <div onClick={() => {
                                if (!selectedAnswer && !endOfTimer) {
                                    setSelectedAnswer(true)
                                    setClickedNumberRadioButton(2)
                                } else if (selectedAnswer && clickedNumberRadioButton === 2) {
                                    setSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[2].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 2}/>
                            </div>
                            <div onClick={() => {
                                if (!selectedAnswer && !endOfTimer) {
                                    setSelectedAnswer(true)
                                    setClickedNumberRadioButton(3)
                                } else if (selectedAnswer && clickedNumberRadioButton === 3) {
                                    setSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[3].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 3}/>
                            </div>
                        </div>
                        <div className={styles.answers_block__bottom}>
                            <div
                                onClick={handleSkipQuestion}>
                                <CustomButton disabled={false} text={'Пропустить'}/>
                            </div>
                            <CustomButton disabled={!selectedAnswer} text={'Ответить'}/>
                        </div>
                    </div>
                </div>
            </>
        )
}