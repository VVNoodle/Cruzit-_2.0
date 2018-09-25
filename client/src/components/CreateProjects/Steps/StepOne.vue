<template>
    <div>
        <v-btn @click="nextStep(1); setUploadType('image')" small dark color="black" value="image" v-model="this.project.type">
            <v-icon>fas fa-images</v-icon>
        </v-btn>
        <v-btn @click="nextStep(1); setUploadType('video')" small dark color="black" value="video" v-model="this.project.type">
            <v-icon>fas fa-video</v-icon>
        </v-btn>
        <v-btn @click="nextStep(1); setUploadType('audio')" small dark color="black" value="audio" v-model="this.project.type">
            <v-icon>fas fa-headphones</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
  props: ['nextStep', 'project'],
  methods: {
    setUploadType (type) {
      this.project.type = type
    }
  }
}
</script>

<style>

</style>
