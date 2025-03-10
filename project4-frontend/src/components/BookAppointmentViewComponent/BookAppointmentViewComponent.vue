<script setup>
// IMPORTS
import { reactive, watch } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import * as appointmentService from '../../services/appointmentService';
// CONSTANTS
const date = new Date();
const today = formatDateISO(date)
const toast = useToast();
const router = useRouter();
const token = localStorage.getItem('token');
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
const state = reactive({
    bookedTiming: [],
    
})

const bookedTimeSlot=[]

// VARIABLE

// STATES
const formData = reactive({
    fullName:"",
    mobileNumber:'',
    email:'',
    service: '',
    date: Date,
    time:'',
    comments:'',
    status: "pending"
})
// watch method is used to run a callback when a reactive state changes, similar to useEffect dependencies
watch(formData,()=>{
    console.log(formData.date)
    checkAppointments(formData.date);
})

watch(state,()=>{
 for (let i=0; i<state.bookedTiming.length; i++) {
    bookedTimeSlot.push(state.bookedTiming[i].time)
 }
 console.log('appointment timings: ',bookedTimeSlot)

})
// FUNCTION
function formatDateISO(date){
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split("T")[0];
    return formattedDate;
};

async function handleSubmitAppointment() {
    if (
        !formData.fullName ||
        !formData.mobileNumber ||
        !formData.email ||
        !formData.service ||
        !formData.date ||
        !formData.time 
    ) {
        toast.error('Please fill up all fields!')
    } else {
        try {
            if (token) {
                console.log('form data: ', formData)
                const pendingAppt = await appointmentService.createAppointmentMember(formData);
                console.log(pendingAppt)
                toast.success('Appointment is booked! please wait for confirmation');
                router.push('/')
                console.log('email confirmation email to: ', formData.email)
            } else {
                console.log('form data: ', formData)
                const pendingAppt = await appointmentService.createAppointmentGuest(formData);
                console.log(pendingAppt)
                toast.success('Appointment is booked! please wait for confirmation');
                router.push('/')
                console.log('email confirmation email to: ', formData.email)
            }
            
        } catch (error) {
            console.log('error message: ',error)
        }
    }
}

async function checkAppointments(date) {
    try {
        // send a request to backend to check 
        const response = await appointmentService.viewAppointmentsForADay(date)
        console.log('response: ',response)
         state.bookedTiming = response
        console.log('booked Timing: ', state.bookedTiming.length)

    } catch (error) {
        console.log(error)

    
    }
}


</script>

<template>
    <div class="flex h-[800px] flex-col justify-center items-center p-2">
        <div class="w-[80%] max-w-[300px] bg-white p-5 shadow-2xl rounded-2xl">
            <form @submit.prevent="handleSubmitAppointment" class="flex flex-col">
            <label for="fullName">name: </label>
            <input v-model="formData.fullName" id="fullName" name="fullName" type="text" class="bg-white border-black border-[2px]"></input>

            <label for="mobileNumber">mobile number: </label>
            <input v-model="formData.mobileNumber" id="mobileNumber" name="mobileNumber" type="tel" class="bg-white border-black border-[2px]"></input>

            <label for="email">Email: </label>
            <input v-model="formData.email" id="email" name="email" type="email" class="bg-white border-black border-[2px]"></input>

            <label for="service" >service: </label>
            <select v-model="formData.service" id="service" name="service" class="bg-white border-black border-[2px]">
                <option value="cut">Cut</option>
                <option value="color">color</option>
                <option value="treatment">treatment</option>
            </select>

            <label for="date">date: </label>
            <input v-model="formData.date" id="date" name="date" type="date" :min="today" class="bg-white border-black border-[2px]"></input>

            

            <label for="time">time: </label>
            <select v-model="formData.time" id="time" name="time" class="bg-white border-black border-[2px]">
                <option v-for="time in availableHours" :name="time">{{ time }}</option>
            </select>

            <label for="comments">Additional Comments?</label>
            <textarea id="comments" name="comments" v-model="formData.comments" class="bg-white border-black border-[2px]"></textarea>

            <button type="submit" class="bg-white border-black border-[2px] mt-2 rounded-2xl hover:bg-brown active:bg-amber-800">Book Appointment</button>
        </form>
        </div>
        
    </div>
</template>