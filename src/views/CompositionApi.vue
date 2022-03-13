<template>
  <div class="hello">
    <h1>{{ state.count }}</h1>
    <button @click="addCount">add</button>
  </div>
</template>

<script lang="ts">
import { reactive,defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      count: 0
    })
    const addCount = () => {
      state.count += 1
    }
    return { state, addCount }
  }
})
</script>
