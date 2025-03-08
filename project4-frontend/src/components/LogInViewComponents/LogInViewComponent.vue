<script setup>
//IMPORT
import { RouterLink, useRouter } from 'vue-router';
import { reactive } from 'vue';
import * as authService from '../../services/authService'
import { useToast } from 'vue-toastification';

// CONSTANTS
const toast = useToast();
const router = useRouter();
const formData = reactive({
    email:'',
    password:''
});

// VARIABLES

// FUNCTIONS
async function handleSubmitSignIn() {
    console.log(formData)
    try {
        const loggedInUser = await authService.logInUser(formData)
        console.log('user logged in: ', loggedInUser)
        toast.success('Welcome!')
        router.push('/member/home')
    } catch (error) {
        console.log(error)
        toast.error('Invalid credentials')
    }
    
}
</script>

<template>
    <div class="w-full h-[800px] flex justify-center items-center">
        <div class="w-[400px] h-[500px] border-[2px] rounded-2xl flex flex-col justify-center items-center shadow-2xl ">
            <h1>MEMBERS LOG IN</h1>
            <form @submit.prevent="handleSubmitSignIn">
            <label for="email">Email: </label>
            <input v-model="formData.email" id="email" name="email" type="email" class="bg-white border-[2px]"></input><br/>

            <label for="password">Password: </label>
            <input v-model="formData.password" id="password" name="password" type="password" class="bg-white border-[2px]"></input><br/>

            <button type="submit" class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Log In</button>
            <RouterLink to="/auth/admin-login"><button class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Log In as Admin</button></RouterLink>

            <p>No account yet?</p>
            <RouterLink to="/auth/signup"> <button  class="border-[2px] p-2 rounded-2xl cursor-pointer active:bg-amber-400">Sign up now!</button></RouterLink>


        </form>
        </div>
            

        
    </div>
</template>