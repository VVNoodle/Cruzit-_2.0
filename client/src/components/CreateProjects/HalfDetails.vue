<template>
    <div>
        <v-text-field light
            label="Description"
            required
            :rules='[required]'
            v-model="project.description"
            :value="project.description"
            multi-line
            clearable
            clear-icon
            counter="150"
            :maxlength="150"
        ></v-text-field>
        <div class="danger-alert" v-if="error">
            {{error}}
        </div>
    </div>
</template>

<script>
export default {
  props: ['project', 'error'],
  methods: {
    required: (value) => !!value || 'Required.'
  }
}
</script>

<style>

</style>
