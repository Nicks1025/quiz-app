import register from "../components/user_registration.vue"
import login from "../components/user_login.vue"
import quiz_dashboard from "../components/quiz_dashboard.vue"
import user_dashboard from "../components/user_dashboard.vue"
import admin from "../components/admin.vue"

export default[
    {
        path : "/",
        component : register
    },
    {
        path : "/login",
        component : login
    },
    {
        path : "/quiz_dashboard",
        component : quiz_dashboard
    },
    {
        path : "/user_dashboard",
        component : user_dashboard
    },
    {
        path : "/admin",
        component : admin
    },
    // {
    //     path : "Error",
    //     component : unauthorizedAccess
    // }
]