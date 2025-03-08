<script setup>
import AdminHomeDashboard from '../components/AdminHomeViewComponents/AdminHomeDashboard.vue';
const token = localStorage.getItem('token');
const decoded = JSON.parse(atob(token.split('.')[1]));
const isAdmin = decoded.payload.admin
console.log(decoded.payload.admin)
</script>

<template>
    
    <h1>admin home page to see all the stuff</h1>
    <div v-if="isAdmin">
        <AdminHomeDashboard />
    </div>
    <div v-else>
        <p>you are not authorised to view this page</p>
    </div>
    
    
</template>