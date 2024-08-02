<script setup lang="ts"></script>

<template>
  <div class="banner flex items-center justify-center max-sm:hidden">
    <slot />
  </div>
</template>

<style>
  .banner {
    background-image: url('/banner.jpeg');
    background-size: cover;
    background-position: center;
    min-height: 240px;
    width: 100%;
  }
</style>
