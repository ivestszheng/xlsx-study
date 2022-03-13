<template>
   <div></div>
</template>

<script lang='ts'>
import { useAxiosGet } from '@/api/example'

export default {
   setup() {
      useAxiosGet({ type: 2 }).then((res: unknown) => { console.log(res) })
   }
}
</script>
