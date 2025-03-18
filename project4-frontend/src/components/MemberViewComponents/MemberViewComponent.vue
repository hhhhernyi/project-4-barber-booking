<script setup>
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));
const userId = decoded.payload._id
console.log(decoded.payload.admin)
import { onMounted, reactive, ref } from 'vue';
import * as userService from '../../services/user'
import dayjs from "dayjs";
dayjs().format()
// IMPORTS
// CONSTANTS
const state = reactive({
    userDetail: {}
})
// VARIABLES
// STATE
onMounted(async ()=>{
    try { 
        const response = await userService.viewSingleUser(userId)
      state.userDetail = response
      console.log(state.userDetail)

    } catch (error) {
        console.log(error)

    }
})
// FUNCTION

</script>

<template>
    <div v-if="token" class="w-full h-[800px] flex flex-col items-center justify-center">
        <div class="rounded-2xl bg-off-white w-[80%] max-w-[400px] flex flex-col justify-center items-center p-3 shadow-2xl">
            <h1 class="text-2xl font-special">Member Info</h1>
            <h2>Email: </h2><p class="border-[2px] px-2 rounded-lg border-gray-400">{{ state.userDetail.email }}</p>
            <h2>Contact: </h2><p class="border-[2px] px-2 rounded-lg border-gray-400">{{ state.userDetail.mobileNumber }}</p>
            <h2>Points: </h2><p class="border-[2px] px-2 rounded-lg border-gray-400">{{ state.userDetail.points }}</p>
            <h2>Member Since: </h2><p class="border-[2px] px-2 rounded-lg border-gray-400">{{  dayjs(state.userDetail.createdAt).toString().slice(0,17) }}</p>
        </div>
        
        
    </div>

    <div v-else-if="!token">
        <p>members who are not logged in are not authorised</p>
    </div>
</template>