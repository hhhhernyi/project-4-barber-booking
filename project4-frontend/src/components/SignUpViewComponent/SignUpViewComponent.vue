<script setup>
function handleSubmitSignUp() {
    console.log('user signed up')
}
</script>

<template>
    <div class="w-full h-[1000px] flex justify-center items-center">
            <form @submit.prevent="handleSubmitSignUp">
            <label>Full Name: </label>
            <input type="text" class="bg-white border-[2px]"></input><br/>
            <label>Mobile Number: </label>
            <input type="text" class="bg-white border-[2px]"></input><br/>
            <label>Email: </label>
            <input type="email" class="bg-white border-[2px]"></input><br/>
            <label>Password: </label>
            <input type="text" class="bg-white border-[2px]"></input><br/>
            <label>Confirm Password: </label>
            <input type="text" class="bg-white border-[2px]"></input><br/>

            <button type="submit" class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Create Account!</button>

        </form>

        
    </div>
</template>