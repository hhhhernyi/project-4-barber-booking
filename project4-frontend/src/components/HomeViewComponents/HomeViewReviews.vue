<script setup>
const reviews = ["review 1", "review 2", "Review 3", "Review 4", "Review 5", "Review 6"];
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const config = {
  height: 200,
  itemsToShow: 3,
  gap: 2,
  autoplay: 1000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
</script>

<template>
  <div class="w-full h-[400px] flex flex-col justify-center my-2 ">
  <Carousel v-bind="config">
    <Slide v-for="item in reviews" :key="slide">
      <div class="carousel__item w-[200px] h-[200px] border-[2px] flex justify-center items-center">{{ item }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  
   </div>
   <div class="w-full flex justify-center">
    <button class="border-[2px] p-2 rounded-2xl bg-darkBrown">Leave a review now!</button>
   </div>
</template>
