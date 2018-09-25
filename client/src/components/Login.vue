<template>
  <div>
      <!-- test@test.com -->
      <!-- eganz245 -->
       <panel title="Login">
           <div slot>
               <v-text-field
                  @keyup.enter="login"
                  name="email"
                  label="Email"
                  v-model="email"
                  type="email"
                ></v-text-field>
                <v-text-field
                  @keyup.enter="login"
                  name="password"
                  label="Password"
                  v-model="password"
                  type="password"
                ></v-text-field>
                <div class="danger-alert" v-html="error"></div>
              <v-btn dark class="blue darken-3" @click="login">
                Login
              </v-btn>
           </div>
       </panel>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'projects'
        })
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.error
        } else {
          this.error = error
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
