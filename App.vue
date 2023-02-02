<template>
  <div id="app">
    <!-- <user_registration v-bind:register_title = "register_title">
      <h1 class = "text-center mt-3 mb-4" slot = title>{{ register_title }}</h1>
    </user_registration> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import register from "./components/user_registration.vue"
export default {
  components : {
    user_registration : register
  },
  data () {
    return {
      register_title: 'Register Here'
    }
  }
}
</script>

<style scoped>

</style>
