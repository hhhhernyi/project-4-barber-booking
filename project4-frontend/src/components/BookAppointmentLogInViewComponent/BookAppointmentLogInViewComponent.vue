<script setup>
//IMPORT
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import * as authService from '../../services/authService'

// CONSTANTS
const toast = useToast();
const router = useRouter();

// VARIABLES
const formData = reactive({
    email: '',
    password:''
})

// FUNCTIONS
async function handleSubmitSignin() {
    console.log('form: ',formData)
    try {
        const loggedInUser = await authService.logInUser(formData)
        console.log('user logged in: ', loggedInUser)
        toast.success('Welcome!')
        router.push('/book-appointment')
    } catch (error) {
        console.log(error)
        toast.error('Invalid credentials')
    }
    
}
</script>

<template>
    <div class="w-full h-[700px] flex justify-center items-center">
        <div class="border-[2px] w-[80%] max-w-[400px] h-[400px] flex justify-center items-center rounded-2xl shadow-2xl">
<form @submit.prevent="handleSubmitSignUp">
            <label for="email">Email: </label>
            <input id="email" name="email" v-model="formData.email" type="email" class="bg-white border-[2px]"></input><br/>

            <label for="password">Password: </label>
            <input id="password" name="password" v-model="formData.password" type="password" class="bg-white border-[2px]"></input><br/>

            <button type="submit" @click="handleSubmitSignin"class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Log In</button>
            <p>No account yet?</p>
            <RouterLink to="/auth/signup"> <button  class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Sign up now!</button></RouterLink>
        </form>
        </div>
            
    </div>
    <div class="flex justify-center mb-10">
        <RouterLink to="/book-appointment"><button class="border-[2px] p-2 rounded-2xl border-amber-950 cursor-pointer">Continue as Guest</button></RouterLink>
    </div>
</template>