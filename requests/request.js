export async function getAllQuestions(){
    const res = await fetch('http://localhost:3002/api/db')

    return res.json()
}