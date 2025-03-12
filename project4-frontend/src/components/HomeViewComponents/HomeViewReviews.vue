<script setup>
const reviews = ["review 1", "review 2", "Review 3", "Review 4", "Review 5", "Review 6"];
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { RouterLink } from 'vue-router';
import * as reviewServices from '../../services/reviewsService'
import { onMounted, reactive } from 'vue';


const config = {
  height: 200,
  itemsToShow: 3,
  gap: 2,
  autoplay: 1000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};

const state = reactive({
  allReviews: []
})

onMounted(async ()=>{
  try {
      state.allReviews = await reviewServices.getReviews()
      console.log(state.allReviews)
  } catch (error) {
    console.log(error)
  }

})

</script>

<template>
  <div class="w-full h-[400px] flex flex-col justify-center my-2 ">
  <Carousel v-bind="config">
    <Slide v-for="item in state.allReviews" :key="slide">
      <div class="carousel__item w-[200px] h-[200px] border-[2px] flex justify-center items-center">{{item.fullName}} <br/>{{ item.review }} <br/> {{ item.stars }}/5 experience</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  
   </div>
   <div class="w-full flex justify-center">
    <button class="border-[2px] p-2 rounded-2xl bg-darkBrown"><RouterLink to="/reviews/new">Leave a review now!</RouterLink></button>
   </div>
</template>
