<script setup>
//IMPORTS
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import * as AuthService from '../../services/authService'
import { onMounted } from "vue";
import { watch } from "vue";
import { computed } from "vue";
//CONSTANTS
const toast = useToast();
const router = useRouter();
//VARIABLE


//STATES
const state =reactive({
    passwordVisibility: false,
    pwMessage: 'view',
    cfmPasswordVisibilty: false,
    cfmPWMessage: 'view'
})
const formData = reactive({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword:"",
    admin: false,
    points: 0
});
// Computed property to check if the form is valid
const isFormValid = computed(() => {
  return (
    formData.fullName &&
    formData.mobileNumber &&
    formData.email &&
    formData.password &&
    formData.confirmPassword
  );
});
//FUNCTIONS
async function handleSubmitSignUp() {
    if ( !formData.fullName || !formData.mobileNumber || !formData.email || !formData.password|| !formData.confirmPassword) {
        toast.error('Please fill up all fields!')
    } else if (validatePassword(formData.password, formData.confirmPassword)===true){
        try {
            console.log('req.body', formData)
            const newUser = await AuthService.signUp(formData)
            console.log('newly created user', newUser)
            toast.success('Account created successfully!')
            router.push('/auth/login')

        } catch (error) {
            toast.error(error.message)
        }
        
    } else {
        toast.error('passwords do not match')
    }
}
function validatePassword(pw, cfmPw) {
  if (pw !== cfmPw) {
    return false; // Passwords don't match
  } else {
    return true; // password matches
  }
}

function checkPassword(password) {
  let errors = [];

  if (password.length < 8) {
    errors.push('at least 8 characters');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('at least one uppercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('at least one number');
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('at least one special character (@$!%*?&)');
  }
  if (errors.length > 0) {
    return `Password must contain ${errors.join(', ')}.`;
  }
  return ''; // No error message
}
function togglePasswordVisiblilty() {
    state.passwordVisibility = !state.passwordVisibility
    if (state.passwordVisibility === false) {
        state.pwMessage ='view'
    } else {
        state.pwMessage='hide'
    }
}
function toggleConfirmPasswordVisiblilty() {
    state.cfmPasswordVisibilty = !state.cfmPasswordVisibilty
    if (state.cfmPasswordVisibilty === false) {
        state.cfmPWMessage ='view'
    } else {
        state.cfmPWMessage='hide'
    }
}



</script>

<template>
    <div class="w-full h-[1000px] flex justify-center items-center">
        <div class="bg-white w-[80%] max-w-[400px] h-[600px] flex flex-col justify-center items-center rounded-2xl shadow-2xl">
            <form @submit.prevent="handleSubmitSignUp" class="flex flex-col w-[90%]">
            <label for="fullName">Full Name: </label>
            <input v-model="formData.fullName" id="fullName" name="fullName" type="text" placeholder="Full Name" class="bg-white border-[2px] px-2 border-gray-400 focus:bg-amber-300"></input><br/>

            <label for="mobileNumber">Mobile Number: </label>
            <input v-model="formData.mobileNumber" id="mobileNumber" name="mobileNumber" type="tel"  placeholder="Mobile Number" class="bg-white border-[2px] px-2 border-gray-400"></input><br/>

            <label for="email">Email: </label>
            <input v-model="formData.email" id="email" name="email" type="email" placeholder="Email" class="bg-white border-[2px] px-2 border-gray-400"></input><br/>

            <label for="password">Password: </label>
            <div class="flex">
                <input @input="passwordError = checkPassword(formData.password)" v-model="formData.password" id="password" name="password" :type="state.passwordVisibility ? 'text' : 'password'"  placeholder="Password" class="bg-white border-[2px] px-2 border-gray-400 w-[80%] mr-4"></input><p @click="togglePasswordVisiblilty" class="border-[1px] rounded-2xl px-2 cursor-pointer">{{ state.pwMessage }}</p>
            </div>
            
            <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p><br/>


            <label for="confirmPassword">Confirm Password: </label>
            <div class="flex">
                <input  @input="cfmPasswordError = checkPassword(formData.confirmPassword)" v-model="formData.confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" :type="state.cfmPasswordVisibilty ? 'text' : 'password'"  class="bg-white border-[2px] px-2 border-gray-400 w-[80%] mr-4"></input><p @click="toggleConfirmPasswordVisiblilty" class="border-[1px] rounded-2xl px-2 cursor-pointer">{{ state.cfmPWMessage }}</p>

            </div>
            
            <p v-if="cfmPasswordError" class="text-sm text-red-500">{{ cfmPasswordError }}</p><br/>

            <button type="submit" :class="{
            'bg-successGreen': isFormValid,
            'bg-gray-400': !isFormValid,
            'border-[2px] p-2 rounded-2xl active:bg-amber-400': true,
          }" :disabled="!isFormValid">Create Account!</button>

        </form>
        </div>
            

        
    </div>
</template>