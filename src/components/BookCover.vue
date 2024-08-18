<script setup lang="ts">
  import BookIcon from './icons/BookIcon.vue';

  defineProps<{
    imageSrc?: string;
  }>();
</script>

<template>
  <div
    class="book-cover flex items-center justify-center rounded"
    :class="{
      'no-cover': !imageSrc,
      'transition-colors': !imageSrc,
      'has-cover': imageSrc,
      'transition-opacity': imageSrc,
    }"
    :style="{
      'background-image': imageSrc ? 'url(' + imageSrc + ')' : 'none',
    }">
    <slot name="icon" v-if="!imageSrc">
      <BookIcon />
    </slot>
  </div>
</template>

<style scoped>
  .book-cover {
    min-height: 220px;
    background-size: 100% 100%;
    background-color: rgb(var(--primary-500));
    position: relative;

    &.no-cover {
      &::before {
        content: '';
        display: block;
        background-color: white;
        height: 100%;
        width: 2px;
        position: absolute;
        left: 2px;
      }
    }
  }
</style>
