<template>
  <div class="hello">
    <h1>{{ state.count }}</h1>
    <button @click="addCount">加</button>
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/composition-api'

export default {
  setup() {
    const state = reactive({
      count: 0
    })
    const addCount = () => {
      state.count += 1
    }
    return { state, addCount }
  }
}
</script>

<style lang="less" scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
