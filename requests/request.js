import axios from "axios";

export async function getAllQuestions(){
    const res = await fetch('http://localhost:3000/api/db')

    return res.json()
}

export async function sendUserAnswers(testCode, data){
    return axios.post('http://localhost:3000/api/sendResult',
        {
            testCode: testCode,
            statistics: data
        }
        ,{
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export async function getUserResults(testCode){
    return axios.get(`http://localhost:3000/api/getResult/${testCode}`)
}