<template>
    <div id = "box" class = "text-center">
        <h1 class = "text-center mt-3 mb-4">Login Here</h1>
        <form @submit.prevent = "loginUser(user.username)">
            <div class = "form-group">
                <label for = "username">Username : </label>
                <input type = "text" class = "form-control" id = "username" v-model = "user.username" placeholder = "username">
            </div>

            <div class = "form-group">
                <label for = "password">Password : </label>
                <input type = "password" class = "form-control" id = "password" v-model = "user.password" placeholder = "passsword">
            </div>

            <p v-show = "showErr" style = "color:red">{{ ErrMsg }}</p>

            <button type = "submit" class = "text-center btn btn-warning mt-2" >Login</button>
            <p class = "mt-3">Don't have an account? <a href = "/">Register here</a></p>
        </form>
    </div>
</template>

<script>
const API_URL = "http://localhost:5000"
export default{
    beforeCreate(){
        if(this.$session.exists()){
            this.$session.destroy()
        }
    },
    data(){
        return{
            user : {
                username : "",
                password : ""
            },
            showErr : false,
            ErrMsg : "username or password is incorrect"
        }
    },
    methods : {
        loginUser : function(username) {
            if(this.user.username == "admin_123" && this.user.password == "admin"){
                this.$router.push("/admin")
            }

            else{
                this.$http.get(API_URL + "/user/" + username)
                .then(data => {
                    if(data.body.length != 0) {
                        const userData = {
                            name : data.body[0].name,
                            username : data.body[0].user_id,
                            password : data.body[0].password
                        }
                        if(this.user.password == userData.password) {
                            this.$session.start()
                            this.$session.set("name",userData.name)
                            this.$session.set("username", userData.username)
                            // this.$session.set("password", userData.password)
        
                            this.$router.push("/quiz_dashboard")
                        }
                        else{
                            this.showErr = true
                        }
                    }
                    else{
                        this.ErrMsg = "User does not exists.. moving to the registration page"
                        this.showErr = true;
                        setTimeout(()=> {
                            this.$router.push("/")
                        },3000)
                    }
                    // console.log(this.$session.getAll())
                }) 
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
</style>