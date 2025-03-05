<script setup>
const reviews = ["review 1", "review 2", "Review 3", "Review 4"];
</script>

<template>
  <div class="w-full h-[400px] border-[2px] flex flex-col my-2">
    <h1>Showing all reviews here</h1>

    <div class="flex">
      <div v-for="item in reviews" class="m-3">
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>
