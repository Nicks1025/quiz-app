const express = require('express')
const app = express()
app.use(express.json())

const pool = require('./db')

// users
app.post("/registerUser", async(req,res) => {
    try {
        const {name, username, password} = req.body
        const newUser = await pool.query("insert into users(name, user_id, password) values ($1, $2, $3)", [name, username, password])
        console.log("user register successfully")
        res.json(newUser)

    } catch (error) {
        console.error(error.message)
    }
})


app.get("/user/:username", async(req,res) => {
    try {
        const user = await pool.query("select * from users where user_id = $1", [req.params.username])
        res.json(user.rows)
    } catch (error) {
        console.error(error.message)

    }
})


// admin
app.get("/admin/getQuestion/:question", async(req,res) => {
    try {
        const question = await pool.query("select question from admin where question = $1", [req.params.question])
        res.json(question.rows)        
    } catch (error) {
        console.error(error.message)
    }
})

app.post("/admin/addQuestion", async(req,res) => {
    try {
        const {question, option1, option2, option3, option4, answer} = req.body;
        const newQuestion = await pool.query("insert into admin(question, option1, option2, option3, option4, answer) values($1, $2, $3, $4, $5, $6)", [question, option1, option2, option3, option4, answer])
        res.json(newQuestion)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/admin/getAll", async(req,res) => {
    try {
        const allQuestions = await pool.query("select * from admin")
        res.json(allQuestions.rows)
    } catch (error) {
        console.error(error.message)
    }
})



// score
app.post("/score/addScore", async(req,res) => {
    try {
        const {user_id, attempted, not_attempted, correct, wrong} = req.body
        const addScore = await pool.query("insert into score(user_id, attempted, not_attempted, correct, wrong) values($1, $2, $3, $4, $5)", [user_id, attempted, not_attempted, correct, wrong])
        res.json(addScore)
    } catch (error) {
        console.error(error.message)
    }
})


app.get("/score/getScore/:username", async(req,res) => {
    try {
        const getScore = await pool.query("select * from score where user_id = $1 order by id desc", [req.params.username])
        res.json(getScore.rows)
    } catch (error) {
        console.error(error.message)
    }
})


const PORT = 5000
app.listen(PORT, ()=>{console.log(`Server started on Port ${PORT}`)})