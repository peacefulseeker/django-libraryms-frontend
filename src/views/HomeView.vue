<script setup lang="ts">
import useAuth from '@/stores/auth';
import Books from '@/components/Books.vue';

const auth = useAuth();
</script>
<template>
  <Books />
</template>
