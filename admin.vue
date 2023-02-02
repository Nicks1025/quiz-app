<template>
    <div id = "box">
        <!-- <form @submit.prevent = "loginAdmin" v-show = "!showAdmin">
            <div class = "form-group">
                <label>Username </label>
                <input type = "text" v-model = "admin.username">
            </div>

            <div class = "form-group">
                <label>Password </label>
                <input type = "password" v-model = "admin.password">
            </div>

            <p style = "color:red">{{ admin.ErrMsg }}</p>
            <button>Login</button>
        </form> -->

        <form @submit.prevent = "addQuiz" v-show = "showAdmin">
            <div class = "form-group">
                <label>Question : </label>
                <input type = "text" class = "form-control" v-model = "quiz.question" placeholder = "Question..." />
            </div>
            
            <div class = "form-group">
                <label>Option 1 : </label>
                <input type = "text" class = "form-control" v-model = "quiz.option1" placeholder = "Option 1" />
            </div>
      
            <div class = "form-group">
                <label>Option 2 : </label>
                <input type = "text" class = "form-control" v-model = "quiz.option2" placeholder = "Option 2" />
            </div>
      
            <div class = "form-group">
                <label>Option 3 : </label>
                <input type = "text" class = "form-control" v-model = "quiz.option3" placeholder = "Option 3" />
            </div>
      
            <div class = "form-group">
                <label>Option 4 : </label>
                <input type = "text" class = "form-control" v-model = "quiz.option4" placeholder = "Option 4" />
            </div>
      
            <div class = "form-group">
                <label>Answer : </label>
                <input type = "text" class = "form-control" v-model = "quiz.answer" placeholder = "Correct Answer" />
            </div>

            <p v-show = "showErr" style = "color:red">{{ ErrMsg }}</p>
            <button>Add question</button>
        </form>
    </div>
</template>

<script>
    const API_URL = "http://localhost:5000"
export default{
    data(){
        return{
            quiz : {
                question : '',
                option1 : '',
                option2 : '', 
                option3 : '', 
                option4 : '', 
                answer : ''
            },
            showErr : false,
            ErrMsg : "question already exists",

            showAdmin : true,
            admin : {
                username : '',
                password : '',
                ErrMsg : ''
            }
        }
    },
    methods : {
        addQuiz : function() {
            this.$http.get(API_URL + "/admin/getQuestion/" + this.quiz.question)
            .then(data => {
                if(data.body.length == 0) {
                    this.$http.post(API_URL + "/admin/addQuestion", this.quiz)
                    .then(data => {
                    })
                }
                else{
                    this.showErr = true
                }
            })
        },

        loginAdmin : function(){
            if(this.admin.username == "admin_123" && this.admin.password == "admin"){
                // this.showAdmin = true
            }
            else{
                this.admin.ErrMsg = "Invalid credentials!!"
            }
        }
    }
}
</script>

<style>
#box{
    border:1px solid black;
    margin:auto;
    width:500px;
    margin-top:100px;
    padding:20px;
}

#box input{
    width:350px;
    margin-left:10px;
}

.form-group{
    margin-bottom:10px;
    display: flex;
    align-items: center;
    width:auto;
}

#box button{
    padding:5px 10px;
    border-radius:10px;
    background-color:darkgoldenrod    
}

#box label{
    margin-right:20px;
}
</style>