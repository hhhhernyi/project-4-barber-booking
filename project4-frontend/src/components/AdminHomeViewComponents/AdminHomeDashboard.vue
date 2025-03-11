<script setup>
// IMPORT
import { onMounted, ref } from "vue";
import ConfirmPopup from 'primevue/confirmpopup';
import * as appointmentService from "../../services/appointmentService";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "vue-toastification";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";
//import dayjs from 'dayjs' // ES 2015
dayjs().format()
// CONSTANTS
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
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
    console.log(pendingAppointment)
    console.log(confirmedAppointment)

  } catch (error) {
    console.log(error)

  }
})
// FUNCTIONS
async function confirmAppt(itemID, fullName, email, service, date, time) {
    console.log('appointment confirmed for: ', itemID)
    console.log('Email sent to: ', email)
    try {
      const updatedAppoinmentStatus = await appointmentService.confirmPendingAppointment(itemID)
      console.log("updated: ", updatedAppoinmentStatus)
      const confirmApptsResponse = await appointmentService.viewConfirmedAppointments();
      const pendingApptsResponse = await appointmentService.viewPendingAppointments();
      pendingAppointment.value = pendingApptsResponse;
      confirmedAppointment.value = confirmApptsResponse;
      const emailResponse = await sendConfirmationEmail(fullName, email, service, date, time);
      console.log('email response: ', emailResponse)
      toast.success('Appointment confirmed')

    } catch (error) {
      console.log(error)
    }
}

function completeAppt(itemID, customer) {
  console.log("appointment completed: ",itemID)
  console.log('points added to: ', customer)
  toast.success('Appointment completed!')
}

async function sendConfirmationEmail(fullName, email, service, date, time) {
    const templateParams = {
        fullName: fullName,
        email: email,
        service: service,
        date: date.slice(0,10),
        time: time,
        message: 'Your Appointment has been confirmed!'
    };
    console.log('templateParams: ', templateParams)

    try {
        const result = await emailjs.send(
            "service_77il0n9",
            "template_k96zlsx",
            templateParams,
            PUBLIC_KEY
        );
        console.log('Email sent successfully', result);
        toast.success('Confirmation email sent!');
    } catch (error) {
        console.log('Error sending email:', error);
        toast.error('There was an error sending the confirmation email.');
    }
}




</script>
<template>
  <div class="w-full h-[800px] flex flex-col justify-center items-center">
    <div class="flex space-around">
      <!-- display all pending appointments here -->
      <div class="border-[2px] m-2 w-[50%] h-[500px] overflow-auto">
        <h2>Pending Appointments</h2>
        <ul>
            <li v-for="item in pendingAppointment" class="flex justify-items-end">{{ item.fullName }} {{ item.service }} {{ dayjs(item.date).toString().slice(0,17) }} {{ item.time }}<button @click="confirmAppt(item._id, item.fullName, item.email, item.service, item.date, item.time)"  class="border-[2px] p-2 rounded-2xl bg-white">confirm appointment?</button></li>
        </ul>

      </div>

      <!-- display all confirmed appointments here -->
      <div class="border-[2px] m-2 w-[50%] h-[500px] overflow-auto">
        <h2>Confirmed Appointments</h2>
        
        <ul>
            <li v-for="item in confirmedAppointment">{{ item.fullName }} {{ item.service }} {{ dayjs(item.date).toString().slice(0,17) }} {{ item.time }}<button @click="completeAppt(item._id, item.customer)"  class="border-[2px] p-2 rounded-2xl bg-white">Completed?</button></li>
        </ul>

      </div>
    </div>
  </div>
</template>
