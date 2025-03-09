<script setup>
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));
const userId = decoded.payload._id
console.log(decoded.payload.admin)
import { onMounted, reactive, ref } from 'vue';
import * as userService from '../../services/user'
// IMPORTS
// CONSTANTS
const userDetail = reactive({key: 'value'})
// VARIABLES
// STATE
onMounted(async ()=>{
    try { 
        const response = await userService.viewSingleUser(userId)
        userDetail.value = response;
        console.log(userDetail)

    } catch (error) {
        console.log(error)

    }
})
// FUNCTION

</script>

<template>
    <div v-if="token" class="w-full h-[800px] flex items-center justify-center">
        <p>members who are logged in can see this</p>
        <h1>Member Info</h1><br/>
        <p>Email: {{ userDetail.value.email }}</p><br/>
        <p>Contact: {{ userDetail.value.mobileNumber }}</p><br/>
        <p>Points: {{ userDetail.value.points }}</p><br/>
        <p>Member Since: {{ userDetail.value.createdAt }}</p><br/>
        
    </div>

    <div v-else-if="!token">
        <p>members who are not logged in are not authorised</p>
    </div>
</template>