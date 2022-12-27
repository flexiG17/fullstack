export async function getAllQuestions(){
    const res = await fetch('http://localhost:3000/api/db')

    return res.json()
}