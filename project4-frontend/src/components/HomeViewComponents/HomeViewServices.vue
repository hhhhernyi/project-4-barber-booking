<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
<div class="w-full my-2 flex flex-col items-center">
    <div class="flex flex-col items-center text-m md:text-2xl md:flex-row md:mx-10">
        <div class="mx-5 text-darkBrown">SERVICES PROVIDED AT</div>
        <div class="flex bg-black w-auto justify-center p-1 rounded-2xl ">
            <p class="text-red m-1">CUT </p>
            <p class="text-white m-1">. </p>
            <p class="text-yellow m-1">STYLE </p>
            <p class="text-white m-1">. </p>
            <p class="text-blue m-1">PERM</p>
        </div>
    </div>
    <div class="flex flex-col md:flex-row items-center justify-around p-2">
        <div class="flex flex-col sm:w-[80%] m-2 border-[1px]">
            <div>
                <img src="../../assets/images/homeServiceCutImage.jpg" alt="cutting hair" class="rounded-3xl"/>
            </div>
            <div>
                <div class="text-3xl">Cut</div>
                <div class="text-sm">Freshen up your look with a precision haircut tailored to suit your personal style. Whether you're going for a classic cut or something modern, our expert barbers take the time to craft a haircut that complements your features and leaves you feeling sharp and confident. From fades to buzz cuts, we’ve got you covered!</div>
            </div>
        </div>

        <div class="flex flex-col sm:w-[80%] m-2 border-[1px]">
            <div>
                <img src="../../assets/images/homeServiceColorImage.jpg" alt="Coloring hair" class="rounded-3xl"/>
            </div>
            <div>
                <div class="text-3xl">Color</div>
                <div class="text-sm">Add some color to your life with a hair coloring service designed just for you. Whether you're looking to brighten up your natural shade, go bold with a new hue, or add some highlights for dimension, our color experts will create a look that enhances your style and gives you that refreshed, vibrant appearance.</div>
            </div>
        </div>

        <div class="flex flex-col sm:w-[80%] m-2 border-[1px]">
            <div>
                <img src="../../assets/images/homeServicePermImage.jpeg" alt="perm hair" class="rounded-3xl"/>
            </div>
            <div>
                <div class="text-3xl">Perm</div>
                <div class="text-sm">Get those gorgeous curls or waves with our professional perming service! If you're looking to add volume, texture, or curl to your hair, our stylists use advanced perming techniques to create lasting results. Whether you want tight curls or loose waves, we’ll work with you to achieve the perfect look that’s full of life and movement.</div>
            </div>
        </div>

        <div class="flex flex-col sm:w-[80%] m-2 border-[1px]">
            <div>
                <img src="../../assets/images/homeServiceTreatmentImage.png" alt="perm hair" class="rounded-3xl"/>
            </div>
            <div>
                <div class="text-3xl">Treatment</div>
                <div class="text-sm">Nourish and rejuvenate your hair with a luxurious hair treatment. From deep conditioning to restoring shine and softness, our treatments are designed to repair and revitalize your hair, leaving it healthier and more manageable. Perfect for dry, damaged, or color-treated hair, these treatments give your locks the TLC they deserve.</div>
            </div>
        </div>

        

    </div>
    <div>
        <RouterLink to="/services"><button class="border-[2px] p-2 bg-darkBrown cursor-pointer animate-bounce hover:bg-amber-700 rounded-3xl">View all our services now!</button></RouterLink>
    </div>
</div>
</template>
