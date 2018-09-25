<template>
    <v-toolbar app dark fixed class="yellow darken-3">
        <template v-if="$vuetify.breakpoint.width < 710">
            <v-menu :nudge-width="100">
                <v-toolbar-title slot="activator">
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                </v-toolbar-title>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title>
                            Browse
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-title>
                            Add
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-title>
                            Profile
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat dark router to="/login" class="" v-if="!$store.state.isUserLoggedIn">
                    <v-icon left>fas fa-sign-in-alt</v-icon> Login
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn flat dark router to="/register" class="" v-if="!$store.state.isUserLoggedIn">
                    <v-icon left>fas fa-arrow-up</v-icon> Sign Up!
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn flat dark @click="logout" class="" v-if="$store.state.isUserLoggedIn">
                    <v-icon left> fas fa-sign-out-alt </v-icon> Logout
                </v-btn>
            </v-toolbar-items>
        </template>
        <template v-else-if="$vuetify.breakpoint.width >= 710">
            <v-toolbar-title class="mr-4">
                <router-link class="home" tag="span" :to='{name: "projects"}'>CruzIt!</router-link>
            </v-toolbar-title>
            <v-toolbar-items>
                <v-btn flat dark router to="/projects" class="">
                    <v-icon left>fas fa-search</v-icon> Browse
                </v-btn>
                <v-toolbar-items>
                <v-btn flat dark router to="/projects/create" class="" v-if="$store.state.isUserLoggedIn">
                    <v-icon left>fas fa-plus</v-icon> Add
                </v-btn>
            </v-toolbar-items>
            </v-toolbar-items>

            <!-- Puts everytime to the right -->
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat dark router to="/login" class="" v-if="!$store.state.isUserLoggedIn">
                    <v-icon left>fas fa-sign-in-alt</v-icon> Login
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn flat dark router to="/profile" class="" v-if="$store.state.isUserLoggedIn">
                    <v-icon left>fas fa-user-alt</v-icon> profile
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn flat dark router to="/register" class="" v-if="!$store.state.isUserLoggedIn">
                    <v-icon left>fas fa-arrow-up</v-icon> Sign Up!
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn flat dark @click="logout" class="" v-if="$store.state.isUserLoggedIn">
                    <v-icon left> fas fa-sign-out-alt </v-icon> Logout
                </v-btn>
            </v-toolbar-items>
        </template>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'projects'
      })
    }
  }
}
</script>

<style scoped>
    .home {
        cursor: pointer;

    }

    .home:hover {
        color: rgb(241, 250, 121);
    }
</style>
