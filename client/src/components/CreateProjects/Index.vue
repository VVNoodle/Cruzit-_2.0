<template>
  <div>
    <v-container fluid>
      <div>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
            :key="`1-step`"
            :step="1"
            :complete="e1 > 1"
            >
            Project Type
            </v-stepper-step>
            <v-divider :key="1"></v-divider>

            <v-stepper-step
            :key="`2-step`"
            :step="2"
            :complete="e1 > 2"
            >
            Post Link
            </v-stepper-step>
            <v-divider :key="2"></v-divider>

            <v-stepper-step
            :key="`3-step`"
            :step="3"
            :complete="e1 > 3"
            >
            Include Details
            </v-stepper-step>
        </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content :step="1" :key="`1-content`">
              <step-one :nextStep="nextStep" :project="project"></step-one>
            </v-stepper-content>

            <v-stepper-content :step="2" :key="`2-content`">
              <step-two :nextStep="nextStep" :project="project" :required="required"></step-two>
            </v-stepper-content>

            <v-stepper-content :step="3" :key="`3-content`">
              <step-three :project="project" :breakpoint="breakpoint" :required="required"></step-three>
              <v-btn color="primary" @click="nextStep(1)">Back</v-btn>
              <v-btn flat @click="nextStep(3)">Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>

    </v-container>
  </div>
</template>

<script>
import StepThree from './Steps/StepThree'
import StepOne from './Steps/StepOne'
import StepTwo from './Steps/StepTwo'

export default {
  components: {
    'step-three': StepThree,
    'step-one': StepOne,
    'step-two': StepTwo
  },
  data () {
    return {
      error: '',
      project: {
        title: '',
        description: '',
        links: [],
        owners: [],
        creativeFields: [],
        uploaderId: this.$store.state.user.id,
        type: '-'
      },
      e1: 1
    }
  },
  methods: {
    required: (value) => !!value || 'Required.',
    nextStep (n) {
      if (n === 3) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    }
  },
  computed: {
    breakpoint () { return this.$vuetify.breakpoint },
    returnError () { return '' }
  }
}
</script>

<style>

</style>
