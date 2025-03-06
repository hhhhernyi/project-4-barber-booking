<script setup>
//IMPORTS
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import * as AuthService from '../../services/authService'
//CONSTANTS
const toast = useToast();
const router = useRouter();
//VARIABLE

//STATES
const formData = reactive({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword:"",
    admin: false,
    points: 0
});
//FUNCTIONS
async function handleSubmitSignUp() {
    if ( !formData.fullName || !formData.mobileNumber || !formData.email || !formData.password|| !formData.confirmPassword) {
        toast.error('Please fill up all fields!')
    } else if (validatePassword(formData.password, formData.confirmPassword)===true){
        console.log('req.body', formData)
        const newUser = await AuthService.signUp(formData)
        console.log('newly created user', newUser)
        toast.success('Account created successfully!')
        router.push('/auth/login')
    } else {
        toast.error('passwords do not match')
    }
}
function validatePassword(pw, cfmPw) {
    if (pw===cfmPw) {
        return true
    } else {
        return false
    }
}

</script>

<template>
    <div class="w-full h-[1000px] flex justify-center items-center">
            <form @submit.prevent="handleSubmitSignUp">
            <label for="fullName">Full Name: </label>
            <input v-model="formData.fullName" id="fullName" name="fullName" type="text" class="bg-white border-[2px]"></input><br/>

            <label for="mobileNumber">Mobile Number: </label>
            <input v-model="formData.mobileNumber" id="mobileNumber" name="mobileNumber" type="tel" class="bg-white border-[2px]"></input><br/>

            <label for="email">Email: </label>
            <input v-model="formData.email" id="email" name="email" type="email" class="bg-white border-[2px]"></input><br/>

            <label for="password">Password: </label>
            <input v-model="formData.password" id="password" name="password" type="password" class="bg-white border-[2px]"></input><br/>

            <label for="confirmPassword">Confirm Password: </label>
            <input v-model="formData.confirmPassword" id="confirmPassword" name="confirmPassword" type="password" class="bg-white border-[2px]"></input><br/>

            <button type="submit" class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Create Account!</button>

        </form>

        
    </div>
</template>