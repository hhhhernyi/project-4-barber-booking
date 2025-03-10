<script setup>
// IMPORT
import { onMounted, ref } from "vue";
import ConfirmPopup from 'primevue/confirmpopup';
import * as appointmentService from "../../services/appointmentService";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "vue-toastification";
import dayjs from "dayjs";
//import dayjs from 'dayjs' // ES 2015
dayjs().format()
// CONSTANTS
const pendingAppointment = ref([]);
const confirmedAppointment = ref([])
const toast = useToast();
const confirm = useConfirm();
// VARIABLES
// STATES
onMounted(async ()=>{
    const token = localStorage.getItem('token')
    const decoded = JSON.parse(atob(token.split('.')[1]));
    console.log(decoded.payload.admin) // i can check for admin status here
  try {
    const confirmApptsResponse = await appointmentService.viewConfirmedAppointments();
    const pendingApptsResponse = await appointmentService.viewPendingAppointments();
    pendingAppointment.value = pendingApptsResponse;
    confirmedAppointment.value = confirmApptsResponse;

  } catch (error) {
    console.log(error)

  }
})
// FUNCTIONS
async function confirmAppt(itemID) {
    console.log('appointment confirmed for: ', itemID)
    try {
      const updatedAppoinmentStatus = await appointmentService.confirmPendingAppointment(itemID)
      console.log("updated: ", updatedAppoinmentStatus)
      const confirmApptsResponse = await appointmentService.viewConfirmedAppointments();
      const pendingApptsResponse = await appointmentService.viewPendingAppointments();
      pendingAppointment.value = pendingApptsResponse;
      confirmedAppointment.value = confirmApptsResponse;

    } catch (error) {
      console.log(error)
    }
}

function completeAppt(itemID) {
  console.log("appointment completed: ",itemID)
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
            <li v-for="item in pendingAppointment">{{ item.fullName }} {{ item.service }} {{ item.date }} {{ item.time }}<button @click="confirmAppt(item._id)"  class="border-[2px] p-2 rounded-2xl bg-white">confirm appointment?</button></li>
        </ul>

      </div>

      <!-- display all confirmed appointments here -->
      <div class="border-[2px] m-2">
        <h2>Confirmed Appointments</h2>
        
        <ul>
            <li v-for="item in confirmedAppointment">{{ item.fullName }} {{ item.service }} {{ item.date }} {{ item.time }}<button @click="completeAppt(item._id)"  class="border-[2px] p-2 rounded-2xl bg-white">Completed?</button></li>
        </ul>

      </div>
    </div>
  </div>
</template>
