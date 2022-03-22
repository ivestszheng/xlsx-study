<template>
  <div />
</template>

<script lang="ts">
import { useAxiosGet, useAxiosPost } from '@/api/example';

export default {
  setup() {
    useAxiosGet({ type: 2 }).then((res: unknown) => {
      console.log('get', res);
    });
    useAxiosPost({ type: 2 }).then((res: unknown) => {
      console.log('post', res);
    });
  },
};
</script>
