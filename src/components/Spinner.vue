<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
</script>
<template>
  <div class="flex items-center justify-center">
    <ProgressSpinner strokeWidth="2" animationDuration="2s" />
  </div>
</template>

<style>
@keyframes p-progress-spinner-color {
  100%,
  0% {
    stroke: rgb(var(--primary-500));
  }
  40% {
    stroke: rgb(var(--primary-200));
  }
  66% {
    stroke: rgb(var(--primary-300));
  }
  80%,
  90% {
    stroke: rgb(var(--primary-400));
  }
}
</style>
