<template>
    <div>
        <h1>User dashboard</h1>

        <div id = "table">
            <table class ="table table-bordered mt-5">
            <thead class="text-center" >
            <tr>
                <th>S.No.</th>
                <th>Attempted</th>
                <th>Not Attempted</th>
                <th>Correct</th>
                <th>Wrong</th>
            </tr>
            </thead>

            <tbody v-for = "score,index in scores">
            <tr>
                <td>{{ index+1 }}</td>  

                <td>{{ score.attempted }}</td>
                <td>{{ score.not_attempted }}</td>
                <td>{{ score.correct }}</td>
                <td>{{ score.wrong }}</td>
            </tr>
          
            </tbody>
        </table>
        </div>

    </div>    
</template>

<script>
const API_URL = "http://localhost:5000"
export default{
    beforeCreate(){
        if(this.$session.exists()) {
            this.$http.get(API_URL + "/score/getScore/" + this.$session.get("username")) 
            .then(data => {
                this.scores = data.body
            })
        }
        else{
            this.$router.push("/login")
        }
        // location.reload()
    },
    data(){
        return{
            username : this.$session.get("username"),
            scores : []
        }
    },
}
</script>

<style>

#table {
    width:90%;
    margin:0 auto;
}
</style>