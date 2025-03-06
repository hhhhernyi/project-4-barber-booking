<script setup>
//IMPORT
import { RouterLink } from 'vue-router';

// CONSTANTS

// VARIABLES

// FUNCTIONS
function handleSubmitSignUp() {
    console.log('user logged in')
}
</script>

<template>
    <div class="w-full h-[700px] flex justify-center items-center">
            <form @submit.prevent="handleSubmitSignUp">
            <label>Email: </label>
            <input type="email" class="bg-white border-[2px]"></input><br/>
            <label>Password: </label>
            <input type="password" class="bg-white border-[2px]"></input><br/>

            <button type="submit" class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Log In</button>
            <p>No account yet?</p>
            <RouterLink to="/auth/signup"> <button  class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Sign up now!</button></RouterLink>
        </form>
    </div>
    <div class="flex justify-center mb-10">
        <RouterLink to="/book-appointment"><button class="border-[2px] p-2 rounded-2xl border-amber-950 cursor-pointer">Continue as Guest</button></RouterLink>
    </div>
</template>