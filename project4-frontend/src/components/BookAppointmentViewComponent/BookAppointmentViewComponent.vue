<script setup>
// IMPORTS
import { reactive, watch, computed } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import * as appointmentService from '../../services/appointmentService';
import emailjs from "@emailjs/browser";

// CONSTANTS
const SERVICE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const TEMPLATE_ID = import.meta.env.VITE_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const date = new Date();
const today = formatDateISO(date)
const toast = useToast();
const router = useRouter();
const token = localStorage.getItem('token');
const openingHours = [
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
// Use computed to track available slots
const availableSlots = computed(() => {
  // Extract times from bookedTiming and filter them out from openingHours
  const bookedTimes = state.bookedTiming.map(booking => booking.time);
  return openingHours.filter(slot => !bookedTimes.includes(slot));
});

let bookedTimeSlot=[]

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
watch(() => formData.date, (newDate, oldDate) => {
    // Only run checkAppointments when the date changes
    if (newDate !== oldDate) {
        state.bookedTiming = []; // Reset the booked timings
        bookedTimeSlot=[]
        console.log('Date changed: ', newDate);
        checkAppointments(newDate); // Trigger the appointment check for the new date
    }
});

watch(state,()=>{
    if (state.bookedTiming.length !== bookedTimeSlot.length) {
        for (let i=0; i<state.bookedTiming.length; i++) {
    bookedTimeSlot.push(state.bookedTiming[i].time)
 }
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

// Function to send email using EmailJS
async function sendConfirmationEmail(formData) {
    const templateParams = {
        fullName: formData.fullName,
        email: formData.email,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: 'Thank you for booking a service with us. This is a receipt of your booking. Please wait for confirmation from our barbers!'
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
                await sendConfirmationEmail(formData);
            } else {
                console.log('form data: ', formData)
                const pendingAppt = await appointmentService.createAppointmentGuest(formData);
                console.log(pendingAppt)
                toast.success('Appointment is booked! please wait for confirmation');
                router.push('/')
                console.log('email confirmation email to: ', formData.email)
                await sendConfirmationEmail(formData);
            }
            
        } catch (error) {
            console.log('error message: ',error)
            toast.error('there was an error processing your request')
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
        <div class="w-[80%] max-w-[500px] bg-white p-5 shadow-2xl rounded-2xl">
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
                <option v-for="time in availableSlots" :name="time">{{ time }}</option>
            </select>

            <label for="comments">Additional Comments?</label>
            <textarea id="comments" name="comments" rows="5" v-model="formData.comments" class="bg-white border-black border-[2px]"></textarea>

            <button type="submit" class="bg-white border-black border-[2px] mt-2 rounded-2xl hover:bg-brown active:bg-amber-800">Book Appointment</button>
        </form>
        </div>
        
    </div>
</template>