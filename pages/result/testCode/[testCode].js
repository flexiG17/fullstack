import {useEffect, useState} from "react";
import styles from "./index.module.scss";
import {
    Backdrop,
    CircularProgress,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {getUserResults} from "../../../requests/request";
import {useRouter} from "next/router";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

function getCountOfCorrectAnswers(userResults) {
    let result = 0
    userResults.map(question => {
        const count = question.isGivenCorrectAnswer ? 1 : 0
        result = result + count
    })

    return result
}

export default function TestResult() {
    const [loading, setLoading] = useState(true)
    const [userResults, setUserResults] = useState(null)
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const router = useRouter()
    const {testCode} = router.query;

    useEffect(() => {
        getUserResults(testCode)
            .then(response => {
                setUserResults(response.data.users[0].user0)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            })
    }, [])

    if (loading)
        return (
            <Backdrop sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={true} invisible={true}>
                <CircularProgress style={{'color': '#00EAD9'}}/>
            </Backdrop>
        )
    else
        return (
            <div className={styles.backgroundFrame}>
                <div className={styles.answersPosition}>
                    <List
                        sx={{width: '100%', maxWidth: 500, bgcolor: '#00EAD9'}}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={`Результат за тест: ${getCountOfCorrectAnswers(userResults)} правильно из ${userResults.length} вопросов`}/>
                            {open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {userResults.map(question => {
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <ListItemButton sx={{pl: 4}}>
                                            <ListItemIcon>
                                                {question.isGivenCorrectAnswer ? <ThumbUpOutlinedIcon/> :
                                                    <ThumbDownOutlinedIcon/>}
                                            </ListItemIcon>
                                            <div>
                                                <div>
                                                    {`${+question.questionNumber + 1}. ${question.questionText}`}
                                                </div>
                                                <div>
                                                    {`Ваш ответ: ${question.userAnswer}`}
                                                </div>
                                                {!question.isGivenCorrectAnswer ?
                                                    <div>
                                                        {`Правильный ответ: ${question.correctAnswer}`}
                                                    </div>
                                                    :
                                                    ''
                                                }
                                                <div>
                                                    {`Затрачено времени на вопрос: ${60 - +question.restOfTime} сек.`}
                                                </div>
                                            </div>
                                        </ListItemButton>
                                    )
                                })}
                            </List>
                        </Collapse>
                    </List>
                </div>
            </div>
        )
}