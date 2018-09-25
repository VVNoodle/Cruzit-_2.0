<template>
    <div>
        <v-layout>
            <v-flex xs5>
                <panel title="Add">
                    <div slot>
                        <v-text-field
                            label="Title"
                            v-model="project.title"
                            required
                            :rules='[required]'
                        ></v-text-field>
                        <v-text-field
                            label="type"
                            required
                            :rules='[required]'
                            v-model="project.type"
                        ></v-text-field>
                        <!-- <v-text-field
                            label="uploader"
                            required
                            :rules='[required]'
                            v-model="project.uploader"
                        ></v-text-field> -->
                    </div>
                </panel>
            </v-flex>
            <v-flex xs7>
                <div class="pl-4">
                    <panel title="Details">
                        <div slot>
                            <v-text-field
                                label="Description"
                                required
                                :rules='[required]'
                                v-model="project.description"
                                multi-line
                            ></v-text-field>
                            <v-text-field
                                label="medium"
                                required
                                :rules='[required]'
                                v-model="project.medium"
                                multi-line
                            ></v-text-field>
                        </div>
                    </panel>
                    <div class="danger-alert" v-if="error">
                    {{error}}
                    </div>
                </div>
                <v-btn dark class="blue darken-3" @click="edit">
                    Finish Edit
                </v-btn>
                <v-btn dark class="red darken-3" @click="cancel">
                    Cancel Edit
                </v-btn>
            </v-flex>
            <v-flex>

            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import ProjectService from '@/services/ProjectService'
export default {
  data () {
    return {
      error: '',
      project: {
        title: '',
        description: '',
        type: '',
        uploader: '',
        medium: ''
      },
      projectBackup: null
    }
  },
  methods: {
    required: (value) => !!value || 'Required.',
    async edit () {
      this.error = ''
      const areAllFieldsFilledIn = Object
        .keys(this.project)
        .every(key => !!this.project[key])
      if (!areAllFieldsFilledIn) {
        setTimeout(() => {
          this.error = 'Please fill in all the required fields'
        }, 500)
        return
      }
      try {
        await ProjectService.edit(this.project)
        this.$router.go(-1)
      } catch (err) {
        console.log(err)
      }
    },
    cancel () {
      this.project = this.projectBackup
      this.$router.go(-1)
    }
  },
  async beforeCreate () {
    try {
      const projectId = this.$store.state.route.params.projectId
      this.project = (await ProjectService.show(projectId)).data
      this.projectBackup = this.project
      // do a request ot the backend for all the projects
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
