import styles from "./componentPage.module.scss";
import CustomRadioButton from '../../components/customRadioButton/radioButton'
import CustomButton from '../../components/customButton/button'
import {useEffect, useState} from "react";
import {QUESTIONS_CONST} from '../../consts/questionConsts'
import {useRouter} from "next/router";
import {getAllQuestions} from "../../requests/request";
import {Backdrop, CircularProgress} from "@mui/material";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

function GetRightAnswer(question) {
    let result = ''
    question.answers.map(answer => {
        if (answer.valid) {
            result = answer.text
        }
    })
    return result
}

function PushUserStatistics(currentQuestion, restOfTime, answer) {
    const parsedStorageFile = JSON.parse(localStorage.getItem('userStatistics'))
    const result = GetRightAnswer(currentQuestion)
    parsedStorageFile.push({
        questionNumber: currentQuestion.number,
        restOfTime: restOfTime,
        userAnswer: answer,
        correctAnswer: result,
        isGivenCorrectAnswer: answer === result
    })

    localStorage.setItem('userStatistics', JSON.stringify(parsedStorageFile))
}

function CheckUserStatistics() {
    const parsedStorageFile = JSON.parse(localStorage.getItem('userStatistics'))
    const sortedFile =
        parsedStorageFile.sort((a, b) => {
            const keyA = +a.questionNumber
            const keyB = +b.questionNumber
            if (keyA < keyB) return -1
            if (keyA < keyB) return 1
            if (keyA === keyB) return 0
        })

    for (let i = 0; i < sortedFile.length - 1; i++) {
        if (sortedFile[i].questionNumber === sortedFile[i + 1].questionNumber) {
            if (sortedFile[i].userAnswer === null)
                sortedFile.splice(i, 1)
        }
    }
    console.log(parsedStorageFile);
}

export default function TestNumber() {
    const router = useRouter()
    const {testNumber} = router.query;

    const [isSelectedAnswer, setIsSelectedAnswer] = useState(false)
    const [clickedNumberRadioButton, setClickedNumberRadioButton] = useState(null)
    const [testQuestions, setTestQuestions] = useState(QUESTIONS_CONST[0])
    const [loading, setLoading] = useState(true)
    const [endOfTimer, setEndOfTimer] = useState(false)
    const [restOfTime, setRestOfTime] = useState(null)
    const [answer, setAnswer] = useState(null)
    /*const [skippedQuestion, setSkippedQuestion] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(false)*/
    const [confirmedAnswer, setConfirmedAnswer] = useState(false)
    const [playingTimer, setPlayingTimer] = useState(true)
    useEffect(() => {
        getAllQuestions()
            .then(data => {
                setTestQuestions(data)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }, [])
    const currentQuestion = testQuestions.questions[testNumber]
    const handleSkipQuestion = () => {
        //setSkippedQuestion(true)
        setLoading(true)
        !confirmedAnswer ? PushUserStatistics(currentQuestion, restOfTime, null) : ''
        setTimeout(() => {
            router.push(`/test/${currentQuestion.number !== testQuestions.questions.length - 1 ? currentQuestion.number + 1 : 0}`)
            setConfirmedAnswer(false)
            //setSkippedQuestion(false)
            setPlayingTimer(true)
            setClickedNumberRadioButton(null)
            setIsSelectedAnswer(false)
            setLoading(false)
            setEndOfTimer(false)
        }, 500)
    }
    const handleChooseQuestion = (currentQuestion) => {
        //setSelectedQuestion(true)
        setLoading(true)
        !confirmedAnswer ? PushUserStatistics(currentQuestion, restOfTime, null) : ''
        setTimeout(() => {
            router.push(`/test/${currentQuestion.number}`)
            setConfirmedAnswer(false)
            //setSelectedQuestion(false)
            setPlayingTimer(true)
            setClickedNumberRadioButton(null)
            setIsSelectedAnswer(false)
            setLoading(false)
            setEndOfTimer(false)
        }, 500)
    }

    const handleAnswer = () => {
        setConfirmedAnswer(true)
        setPlayingTimer(false)
        PushUserStatistics(currentQuestion, restOfTime, answer)
    }

    const handleCloseTest = () => {
        //setLoading(true)
        CheckUserStatistics()
        // запрос в бд
        /*setTimeout(() => {
            router.push(`/result/testCode/${testQuestions.testCode}`)
        }, 500)*/
    }
    const renderTime = ({remainingTime}) => {
        setRestOfTime(remainingTime)
        return <div className={styles.timer__time_limit}>{remainingTime === 0 ? 'Время вышло' : remainingTime}</div>
    }
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
                        <div onClick={handleCloseTest}>
                            ffff
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
                            isPlaying={playingTimer}
                            duration={currentQuestion.timeLimit}
                            /*initialRemainingTime={+restOfTime}*/
                            colors="#00EAD9"
                            onComplete={() => {
                                setEndOfTimer(true)
                            }}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                    <div className={styles.text_question}>
                        {currentQuestion.text}
                    </div>
                    <div className={styles.answers_block}>
                        <div className={styles.answers_block__top}>
                            <div onClick={() => {
                                if (!isSelectedAnswer && !endOfTimer) {
                                    setAnswer(currentQuestion.answers[0].text)
                                    setIsSelectedAnswer(true)
                                    setClickedNumberRadioButton(0)
                                } else if (isSelectedAnswer && clickedNumberRadioButton === 0 && !confirmedAnswer) {
                                    setAnswer(null)
                                    setIsSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[0].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 0 || confirmedAnswer}/>
                            </div>
                            <div onClick={() => {
                                if (!isSelectedAnswer && !endOfTimer) {
                                    setAnswer(currentQuestion.answers[1].text)
                                    setIsSelectedAnswer(true)
                                    setClickedNumberRadioButton(1)
                                } else if (isSelectedAnswer && clickedNumberRadioButton === 1 && !confirmedAnswer) {
                                    setAnswer(null)
                                    setIsSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[1].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 1 || confirmedAnswer}/>
                            </div>
                        </div>
                        <div className={styles.answers_block__middle}>
                            <div onClick={() => {
                                if (!isSelectedAnswer && !endOfTimer) {
                                    setAnswer(currentQuestion.answers[2].text)
                                    setIsSelectedAnswer(true)
                                    setClickedNumberRadioButton(2)
                                } else if (isSelectedAnswer && clickedNumberRadioButton === 2 && !confirmedAnswer) {
                                    setAnswer(null)
                                    setIsSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[2].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 2 || confirmedAnswer}/>
                            </div>
                            <div onClick={() => {
                                if (!isSelectedAnswer && !endOfTimer) {
                                    setAnswer(currentQuestion.answers[3].text)
                                    setIsSelectedAnswer(true)
                                    setClickedNumberRadioButton(3)
                                } else if (isSelectedAnswer && clickedNumberRadioButton === 3 && !confirmedAnswer) {
                                    setAnswer(null)
                                    setIsSelectedAnswer(false)
                                    setClickedNumberRadioButton(null)
                                }
                            }}>
                                <CustomRadioButton
                                    text={currentQuestion.answers[3].text}
                                    disabled={endOfTimer || clickedNumberRadioButton !== null && clickedNumberRadioButton !== 3 || confirmedAnswer}/>
                            </div>
                        </div>
                        <div className={styles.answers_block__bottom}>
                            <div onClick={confirmedAnswer ? null : handleSkipQuestion}>
                                <CustomButton disabled={confirmedAnswer} text={'Пропустить'}/>
                            </div>
                            <div onClick={handleAnswer}>
                                <CustomButton disabled={!isSelectedAnswer} text={'Ответить'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}