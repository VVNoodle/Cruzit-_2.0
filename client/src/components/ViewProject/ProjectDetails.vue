<template>
    <div>
        <panel title="Details"
            class="ml-2">
            <div slot>
                <h3>Description</h3>
                <textarea readonly
                    v-model="project.description"></textarea>
                <h3>Medium</h3>
                <textarea readonly
                    v-model="project.medium"></textarea>
            </div>
        </panel>
    </div>
</template>

<script>

export default {
  props: ['project']
}
</script>

<style>
textarea {
  width: 80%;
  font-family: monospace;
  border: none;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
}
</style>
