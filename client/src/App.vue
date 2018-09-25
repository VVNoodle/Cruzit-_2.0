<template>
  <div id="app">
    <v-app>
      <main>
        <vue-header></vue-header>
        <v-container fluid>
          <router-view />
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    'vue-header': Header
  },
  watch: {
    breakpoint (data) {
      alert(data)
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: rgb(247, 244, 244);
}
body {
  background-color: rgb(247, 244, 244);
}
.danger-alert {
  color: red;
}
</style>
