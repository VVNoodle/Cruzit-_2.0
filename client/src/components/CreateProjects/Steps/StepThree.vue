<template>
    <div>
        <v-layout>
            <v-flex :xs6="this.breakpoint.width > 768" :xs12="this.breakpoint.width <= 768">
            <v-text-field light
                label="Title"
                v-model="project.title"
                required
                :rules='[required]'
                append-icon="fas fa-heading"
                clearable
                clear-icon
                autofocus
            ></v-text-field>

            <v-select
                v-model="project.creativeFields"
                :items="creativeFields"
                required
                :rules='[required]'
                label="Creative Fields"
                append-icon="fas fa-paint-brush"
                multiple
                chips
                tags
            ></v-select>

            <v-select
                v-model="project.owners"
                label="Additional Owners"
                chips
                tags
                clearable
                clear-icon
                append-icon="fas fa-users"
            ></v-select>

            </v-flex>
            <v-flex v-if="this.breakpoint.width > 768" xs6  class="pl-4">
            <half-detail :project="project"></half-detail>
            </v-flex>
        </v-layout>
        <v-layout v-if="this.breakpoint.width <= 768">
            <v-flex xs12>
            <half-detail :project="project"></half-detail>
            </v-flex>
        </v-layout>
         <v-btn dark class="blue darken-3" @click="add">
            Submit
        </v-btn>
    </div>
</template>

<script>
import HalfDetail from '../HalfDetails'
import ProjectService from '@/services/ProjectService'
import UserService from '@/services/UserService'

export default {
  components: {
    'half-detail': HalfDetail
  },
  props: ['project', 'breakpoint', 'required'],
  data () {
    return {
      creativeFields: ['UI/UX', 'Sculpture', 'Animation', 'Oil', 'Water Color', 'Stop Motion']
    }
  },
  methods: {
    async add () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.project)
        .every(key => !!this.project[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        this.project.owners.unshift(this.$store.state.user.username)
        const currProject = (await ProjectService.post(this.project)).data
        this.project.owners.forEach(async (owner) => {
          await UserService.addOwner(owner, currProject.id)
        })
        this.$router.push({
          name: 'projects'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
