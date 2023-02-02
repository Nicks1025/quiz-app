<template>
    <div id = "box" class = "text-center">
        <h1 class = "text-center mt-3 mb-4">Register Here</h1>
        <slot name = "title"></slot>
        <form @submit.prevent = "RegisterUser">
            <div class = "form-group">
                <label for = "name">Name : </label>
                <input type = "text" class = "form-control" id = "name" v-model = "user.name" placeholder = "Name">
            </div>

            <div class = "form-group">
                <label for = "username">Username : </label>
                <input type = "text" class = "form-control" id = "username" v-model = "user.username" placeholder = "username">
            </div>

            <div class = "form-group">
                <label for = "password">Password : </label>
                <input type = "password" class = "form-control" id = "password" v-model = "user.password" placeholder = "passsword">
            </div>

            <button type = "submit" class = "text-center btn btn-warning mt-2">Register here</button>
            <p v-show = "showErr" style = "color:red">{{ErrMsg}}</p>
            <p class = "mt-3">Already have an account? <a href = "/login">Log in</a></p>
        </form>
    </div>
</template>

<script>
const API_URL = "http://localhost:5000"
export default{

    beforeCreate(){
        if(this.$session.exists()) {
            this.$session.destroy()
        }
    },

    props : ['register_title'],
    data(){
        return{
            user : {
                name : "",
                username : "",
                password : ""
            },
            showErr : false,
            ErrMsg : "user already exists"
        }
    },
    methods : {
        RegisterUser : function() {
            this.$http.get(API_URL + "/user/" + this.user.username)
            .then(data => {
                console.log(data)
                if(data.body.length != 0 || this.user.username == "admin123") {
                    this.showErr = true
                }
                else{
                    if(this.user.username && this.user.password) {
                        this.$http.post(API_URL + "/registerUser" , this.user)
                        .then(data => {
                            this.$router.push("/login")
                        })
                    }
                }
            })
            
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
</style>