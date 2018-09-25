<template>
  <div>
    <panel title="Register">
      <div slot>
        <form name="cruzit-form" autocomplete="off">
        <v-text-field
          @keyup.enter="register"
          name="email"
          label="Email"
          autocomplete="new-password"
          v-model="email"
          type="email"
        ></v-text-field>
        <v-text-field
          @keyup.enter="register"
          name="username"
          label="Username"
          autocomplete="new-password"
          v-model="username"
          type="email"
        ></v-text-field>

          <v-layout>
            <v-flex xs1 mr-1>
              <p>Affiliation</p>
            </v-flex>
            <v-flex xs10>
              <v-btn-toggle v-model="affiliation">
                <v-btn flat value="Cowell">
                  <span>Cowell</span>
                  <v-icon>fas fa-football-ball</v-icon>
                </v-btn>
                <v-btn flat value="Stevenson">
                  <span>Stevenson</span>
                  <v-icon>fa fa-discourse</v-icon>
                </v-btn>
                <v-btn flat value="Crown">
                  <span>Crown</span>
                  <v-icon>fas fa-flask</v-icon>
                </v-btn>
                <v-btn flat value="Merrill">
                  <span>Merril</span>
                  <v-icon></v-icon>
                </v-btn>
                <v-btn flat value="9">
                  <span>9</span>
                  <v-icon>fas fa-globe</v-icon>
                </v-btn>
                <v-btn flat value="10">
                  <span>10</span>
                  <v-icon>fas fa-globe</v-icon>
                </v-btn>
                <v-btn flat value="Porter">
                  <span>Porter</span>
                  <v-icon>fas fa-leaf</v-icon>
                </v-btn>
                <v-btn flat value="Kresge">
                  <span>Kresge</span>
                  <v-icon>fas fa-book-open</v-icon>
                </v-btn>
                <v-btn flat value="Rachel Carson">
                  <span>Rachel Carson</span>
                  <v-icon>fas fa-earlybirds</v-icon>
                </v-btn>
                <v-btn flat value="Oakes">
                  <span>Oakes</span>
                  <v-icon>fas fa-tree</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>

        <v-text-field
          name="password"
          label="Password"
          autocomplete="new-password"
          v-model="password"
          :type="e1 ? 'password' : 'text'"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
        ></v-text-field>
        <v-text-field
          @keyup.enter="register"
          name="confirm password"
          label="Confirm Password"
          autocomplete="new-password"
          v-model="confirmPassword"
          type="password"
        ></v-text-field>
        </form>
        <div class="danger-alert" v-html="error"></div>
        <v-btn dark class="blue darken-3" @click="register">
        Register
        </v-btn>
      </div>
    </panel>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      affiliation: '',
      error: null,
      e1: true
    }
  },
  methods: {
    async register () {
      try {
        if (this.password !== this.confirmPassword) {
          this.error = 'Password not matching'
          return
        }
        console.log('this password:', this.password)
        const response = await AuthenticationService.register({
          email: this.email,
          username: this.username,
          password: this.password,
          affiliation: this.affiliation
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'login'
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
