<template>
    <div>
        <!-- <h1>quiz dashboard</h1> -->

        <div id = "nav">
            <h2>{{ this.$session.get("username") }}</h2>
            <div>
                <button @click.once = "start">Start</button>
                <button @click.once = "end(quiz.answer)">End</button>
                <button @click = "dashboard">ScoreBoard</button>
                <button @click = "logout">Logout</button>
            </div>
        </div>

        <div id = "showCircle" v-show = "showCircle">
            <div id = "circle">
                {{ count }}
            </div>
        </div>

        <div id = "body" v-show = "!showCircle">
            <div id = "counter" ref = "counter">{{ counter }}</div>
            
            <div v-show = "test_start">
                <p>{{ids.length}} . {{quiz.question}}</p>
                <select v-model = "answer">
                    <option>{{quiz.option1}}</option>
                    <option>{{quiz.option2}}</option>
                    <option>{{ quiz.option3 }}</option>
                    <option>{{ quiz.option4 }}</option>
                </select>
            </div>
            <button @click = "nextQuiz(quiz.answer)" v-show = "showNext" style = "margin-top:10px; padding: 5px 10px; border-radius : 10px ">Next</button>
        </div>

    </div>    
</template>

<script>
const API_URL = "http://localhost:5000"
export default{
    beforeCreate() {
        if(!this.$session.exists()) {
            this.$router.push("/login")
        }
        this.$http.get(API_URL + "/admin/getAll")
        .then(data => {
            this.quizes = data.body
        })
    },
    data(){
        return{
            quiz : {
                id : '',
                question : '',
                option1 : '', 
                option2 : '', 
                option3 : '',
                option4 : '',
                answer : ''
            },
            test_start : false,
            answer : null,

            counter : 10,
            quizes : [],

            nos : 4,
            // random id
            ids : [],
            i : 0,

            score : {
                user_id : this.$session.get("username"),
                attempted : 0,
                not_attempted : 0,
                correct : 0,
                wrong : 0
            },
            showNext : false,
            showCircle : false  ,
            count : 3

        }
    },

    
    methods : {
        nextQuiz : function(correct_answer){
            if(this.test_start) {
                if(this.answer == correct_answer) {
                    this.score.correct++;
                }
                else if(this.answer == null){
                    this.score.not_attempted++
                }
                else{
                    this.score.wrong++;
                }
                
                this.score.attempted = this.nos - this.score.not_attempted
    
                if(this.ids.length == this.nos) {

                    this.$http.post(API_URL + "/score/addScore",this.score)
                    .then(data => {
                        console.log(data)
                    })

                    this.$router.push("/user_dashboard")
                }

                
                if(this.ids.length < this.nos) {
                    this.answer =null
                    this.randomNumber()
                    var i = this.i
            
                    this.quiz.id = this.quizes[i].id
                    this.quiz.question = this.quizes[i].question
                    this.quiz.option1 = this.quizes[i].option1
                    this.quiz.option2 = this.quizes[i].option2
                    this.quiz.option3 = this.quizes[i].option3
                    this.quiz.option4 = this.quizes[i].option4
                    this.quiz.answer = this.quizes[i].answer
    
                }
            }
            
        },

        randomNumber : function() {
            let i =  Math.floor(Math.random()*this.nos)
            if(this.ids.includes(i)) {
                this.randomNumber()
            }
            else{
                this.ids.push(i)
                this.i = i;
            }
        },


        start : function(){
            this.showCircle = true
            const timer = setInterval(() => {
                this.count--;
                if(this.count == 0) {
                    this.showCircle = false
                    clearInterval(timer)
                }
            },1000)
            
            
            setTimeout(()=>{
                this.showNext = true
                this.test_start = true
                var id = Math.floor(Math.random()*this.nos)
                
                this.ids.push(id)
    
                console.log(id)
                this.quiz.id = this.quizes[id].id
                this.quiz.question = this.quizes[id].question
                this.quiz.option1 = this.quizes[id].option1
                this.quiz.option2 = this.quizes[id].option2
                this.quiz.option3 = this.quizes[id].option3
                this.quiz.option4 = this.quizes[id].option4
                this.quiz.answer = this.quizes[id].answer
            },3000)

            // let timers = setInterval(()=> {
            //     this.counter--;
            //     if(this.counter == 0) {
            //         clearInterval(timers)
            //         this.nextQuiz()
            //     }

            // },1000)
        },
        end : function(correct_answer) {
            if(this.test_start) {
                if(this.answer == correct_answer) {
                    this.score.correct++;
                }
                else if(this.answer != null && this.answer != correct_answer){
                    this.score.wrong++;
                }

                this.score.attempted = this.score.correct + this.score.wrong
                this.score.not_attempted = this.nos - this.score.attempted
                


                // if(this.score.not_attempted == 0) {
                //     this.score.not_attempted = this.nos
                // }
                this.$http.post(API_URL + "/score/addScore",this.score)
                .then(data => {
                    console.log(data)
                    this.$router.push("/user_dashboard")
                })
            }        
        },
        logout : function(){
            this.$session.destroy()
            this.$router.push("/login")
        },
        dashboard : function() {
            if(this.$session.exists()){
                this.$router.push("/user_dashboard")
            }
        }
    },
    updated(){
        this.$refs['counter'].textContent === this.counter;
    }
}
</script>

<style>
body{
    padding:10px;
}
#nav{
    padding:10px 15px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    background-color :goldenrod 
}

#nav button{
    padding:5px 15px;
    border-radius:5px;
    background-color:orangered;
    margin-left : 15px;
}

#counter {
    color:Red;
    position:absolute;
    margin-top:5px;
    right:2%;
    font-size:30px;
    background-color:aquamarine;
    padding:10px;
    border-radius:50px;
}
select{
    width:200px;
}

#showCircle{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top:10%;
}

#circle{
    display:flex;
    align-items: center;
    justify-content: center;
    font-size:50px;
}
</style>