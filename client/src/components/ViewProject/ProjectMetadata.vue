<template>
    <div>
        <panel title="Project Metadata">
            <div slot>
                <v-layout>
                    <v-flex xs6>
                    <div class="project-title">
                        {{project.title}}
                    </div>
                    <div v-for="(owner, index) in project.owners" :key="index" class="project-uploader">
                        {{owner}}
                    </div>
                    <div class="project-type">
                        {{project.type}}
                    </div>
                    </v-flex>
                    <v-flex xs6>
                    <div class="project-image">
                        <img class="project-image" src="http://via.placeholder.com/500x500" alt="">
                    </div>
                    <div v-if="isUserLoggedIn">
                      <v-btn v-if="byUser" dark color="accent" :to='{name: "project-edit", params() { return {projectId: project.id} } }'>
                          <v-icon left>
                            fas fa-edit
                          </v-icon>
                          Edit
                      </v-btn>
                      <v-btn v-if="!bookmark || bookmark.length == 0" :disabled="disableButton" flat icon color="yellow darken-2" @click="setAsbookmark">
                        <v-icon>
                        far fa-star
                        </v-icon>
                      </v-btn>
                      <v-btn v-else :disabled="disableButton" flat icon color="yellow darken-2" @click="removebookmark">
                        <v-icon>
                        fas fa-star
                        </v-icon>
                      </v-btn>
                    </div>
                    </v-flex>
                </v-layout>
            </div>
        </panel>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: ['project'],
  data () {
    return {
      bookmark: null,
      disableButton: false
    }
  },
  methods: {
    async setAsbookmark () {
      this.disableButton = true
      try {
        this.bookmark = (await BookmarksService.post({
          projectId: this.project.id
        })).data
        this.disableButton = false
      } catch (err) {
        console.log(err)
      }
    },
    async removebookmark () {
      this.disableButton = true
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
        this.disableButton = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    async project () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        this.bookmark = (await BookmarksService.index({
          projectId: this.project.id
        })).data
        if (this.bookmark.length) {
          this.bookmark = this.bookmark[0]
          console.log(this.bookmark)
        }
      } catch (err) {
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    byUser () {
      return this.user.id === this.project.uploaderId
    }
  }
}
</script>

<style scoped>
.project{
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.project-image {
  width: 100%;
  margin: 0 auto;
}
.project-title {
  font-size: 30px;
}
.project-type {
  font-size: 18px;
}
</style>
