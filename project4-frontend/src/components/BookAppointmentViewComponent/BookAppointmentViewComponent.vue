<script setup>
// IMPORTS
import { reactive } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import * as appointmentService from '../../services/appointmentService';
// CONSTANTS
const toast = useToast();
const router = useRouter();
const availableHours = [
    '1030-1100',
    '1100-1130',
    '1130-1200',
    '1200-1230',
    '1230-1300',
    '1300-1330',
    '1330-1400',
    '1400-1430',
    '1430-1500',
    '1500-1530',
    '1530-1600',
    '1600-1630',
]

// VARIABLE

// STATES
const formData = reactive({
    fullName:"",
    mobileNumber:'',
    service: '',
    date:'',
    time:'',
    status: "pending"
})
// FUNCTION
async function handleSubmitAppointment() {
    if (
        !formData.fullName ||
        !formData.mobileNumber ||
        !formData.service ||
        !formData.date ||
        !formData.time 
    ) {
        toast.error('Please fill up all fields!')
    } else {
        try {
            const pendingAppt = await appointmentService.createAppointment(formData);
            console.log(pendingAppt)
            toast.success('Appointment is booked! please wait for confirmation');
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
}



</script>

<template>
    <div class="flex h-[800px] flex-col justify-center items-center">
        <form @submit.prevent="handleSubmitAppointment">
            <label for="fullName">name: </label>
            <input v-model="formData.fullName" id="fullName" name="fullName" type="text" class="bg-white border-black border-[2px]"></input>

            <label for="mobileNumber">mobile number: </label>
            <input v-model="formData.mobileNumber" id="mobileNumber" name="mobileNumber" type="tel" class="bg-white border-black border-[2px]"></input>

            <label for="service" >service: </label>
            <select v-model="formData.service" id="service" name="service" class="bg-white border-black border-[2px]">
                <option value="cut">Cut</option>
                <option value="color">color</option>
                <option value="treatment">treatment</option>
            </select>

            <label for="date">date: </label>
            <input v-model="formData.date" id="date" name="date" type="date" class="bg-white border-black border-[2px]"></input>

            <label for="time">time: </label>
            <select v-model="formData.time" id="time" name="time" class="bg-white border-black border-[2px]">
                <option v-for="time in availableHours" :name="time">{{ time }}</option>
            </select>

            <button type="submit">Book Appointment</button>
        </form>
    </div>
</template>