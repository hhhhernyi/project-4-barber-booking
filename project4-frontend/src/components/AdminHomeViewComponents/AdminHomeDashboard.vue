<script setup>
// IMPORT
import { ref } from "vue";
import ConfirmPopup from 'primevue/confirmpopup';
import * as appointmentService from "../../services/appointmentService";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "vue-toastification";
// CONSTANTS
const pending = ref([]);
const confirmed = ref([])
const toast = useToast();
const confirm = useConfirm();
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
        console.log(pending.value)

        const confirmedAppt = await appointmentService.viewConfirmedAppointments();
        confirmed.value = confirmedAppt;

    } catch (error) {
        console.log(error)
    }
}

async function confirmAppt(itemID) {
    console.log('appointment confirmed for: ', itemID)
    try {
      const updatedAppoinmentStatus = await appointmentService.confirmPendingAppointment(itemID)
      console.log("updated: ", updatedAppoinmentStatus)

    } catch (error) {
      console.log(error)
    }
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
            <li v-for="item in pending">{{ item._id }} {{ item.fullName }} {{ item.service }} {{ item.date }} {{ item.time }}<button @click="confirmAppt"  class="border-[2px] p-2 rounded-2xl bg-white">confirm appointment?</button></li>
        </ul>

      </div>

      <!-- display all confirmed appointments here -->
      <div class="border-[2px] m-2">
        <h2>Confirmed Appointments</h2>
        
        <ul>
            <li v-for="item in confirmed">{{ item.fullName }} {{ item.service }} {{ item.date }} {{ item.time }}</li>
        </ul>

      </div>
    </div>
    <button @click="getAppts">Check appointments</button>
  </div>
</template>
