<script setup>
// IMPORT
import { ref } from "vue";
import * as appointmentService from "../../services/appointmentService";
// CONSTANTS
const pending = ref([]);
const confirmed = ref([])
// VARIABLES
// STATES
// FUNCTIONS
async function getAppts() {
    const token = localStorage.getItem('token')
    const decoded = JSON.parse(atob(token.split('.')[1]));
    console.log(decoded.payload.admin) // i can check for admin status here
    try {
        const pendingAppt = await appointmentService.viewPendingAppointments()
        pending.value = pendingAppt;

        const confirmedAppt = await appointmentService.viewConfirmedAppointments();
        confirmed.value = confirmedAppt;

    } catch (error) {
        console.log(error)
    }
}

function confirmAppt() {
    console.log('appointment confirmed')
}


</script>
<template>
  <div class="w-full h-[800px] flex flex-col justify-center items-center">
    <h1>Display all the appointments here</h1>
    <div class="flex space-around">
      <!-- display all pending appointments here -->
      <div class="border-[2px] m-2">
        <h2>Pending Appointments</h2>
        <ul>
            <li v-for="item in pending">{{ item.fullName }} {{ item.service }} {{ item.time }}<button @click="confirmAppt"class="border-[2px] p-2 rounded-2xl bg-white">confirm appointment?</button></li>
        </ul>

      </div>

      <!-- display all confirmed appointments here -->
      <div class="border-[2px] m-2">
        <h2>Confirmed Appointments</h2>
        <ul>
            <li v-for="item in confirmed">{{ item.fullName }} {{ item.service }} {{ item.time }}</li>
        </ul>

      </div>
    </div>
    <button @click="getAppts">Check appointments</button>
  </div>
</template>
