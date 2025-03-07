<template>
    <div class="max-w-4xl mx-auto p-6 bg-white">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Book Your Appointment</h1>
      
      <form @submit.prevent="submitBooking" class="space-y-8">
        <!-- Personal Information -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Personal Information</h2>
          
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
            <input 
              id="name"
              v-model="booking.name" 
              type="text" 
              required
              placeholder="Enter your full name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Contact Number*</label>
            <input 
              id="phone"
              v-model="booking.phone" 
              type="tel" 
              required
              placeholder="Enter your phone number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
        </div>
        
        <!-- Service Selection -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Service Selection</h2>
          
          <div>
            <p class="block text-sm font-medium text-gray-700 mb-2">Select Service*</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                v-for="(service, index) in services" 
                :key="index"
                class="border rounded-lg p-4 cursor-pointer transition-all"
                :class="{ 'border-green-500 bg-green-50': booking.service === service.name, 'border-gray-200 hover:bg-gray-100': booking.service !== service.name }"
                @click="selectService(service)"
              >
                <h3 class="font-semibold text-gray-800">{{ service.name }}</h3>
                <p class="text-gray-600">{{ service.duration }} minutes</p>
                <p class="text-sm text-gray-500 mt-1">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Date & Time Selection -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold text-gray-700 pb-2 border-b border-gray-200 mb-4">Appointment Date & Time</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Select Date*</label>
              <input 
                id="date"
                v-model="booking.date" 
                type="date" 
                required
                :min="today"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label for="time" class="block text-sm font-medium text-gray-700 mb-1">Select Time*</label>
              <select 
                id="time"
                v-model="booking.time" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select a time slot</option>
                <option 
                  v-for="timeSlot in availableTimeSlots" 
                  :key="timeSlot"
                  :value="timeSlot"
                >
                  {{ timeSlot }}
                </option>
              </select>
              <p v-if="booking.service" class="mt-2 text-sm text-gray-600">
                Appointment will end at {{ calculateEndTime(booking.time) }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Submit Button -->
        <div class="text-center">
          <button 
            type="submit" 
            class="px-6 py-3 text-white font-medium rounded-md"
            :class="isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'"
            :disabled="!isFormValid"
          >
            Book Appointment
          </button>
        </div>
      </form>
      
      <!-- Confirmation Modal -->
      <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h2>
          <div class="space-y-2 mb-6">
            <p><span class="font-semibold">Name:</span> {{ booking.name }}</p>
            <p><span class="font-semibold">Phone:</span> {{ booking.phone }}</p>
            <p><span class="font-semibold">Service:</span> {{ booking.service }}</p>
            <p><span class="font-semibold">Date:</span> {{ formatDate(booking.date) }}</p>
            <p><span class="font-semibold">Time:</span> {{ booking.time }} - {{ calculateEndTime(booking.time) }}</p>
          </div>
          <button 
            @click="closeConfirmation" 
            class="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookingForm',
    data() {
      return {
        services: [
          { 
            name: 'Cut', 
            duration: 30,
            description: 'Haircut with style consultation'
          },
          { 
            name: 'Color', 
            duration: 60,
            description: 'Full color service with consultation'
          },
          { 
            name: 'Treatment', 
            duration: 90,
            description: 'Deep conditioning and specialized hair treatments'
          }
        ],
        booking: {
          name: '',
          phone: '',
          service: '',
          serviceDuration: 0,
          date: '',
          time: ''
        },
        showConfirmation: false
      };
    },
    computed: {
      today() {
        const date = new Date();
        return date.toISOString().split('T')[0];
      },
      availableTimeSlots() {
        // Generate time slots from 9 AM to 5 PM
        const slots = [];
        const openTime = 9; // 9 AM
        const closeTime = 17; // 5 PM
        
        for (let hour = openTime; hour < closeTime; hour++) {
          slots.push(`${hour}:00`);
          slots.push(`${hour}:30`);
        }
        
        return slots;
      },
      isFormValid() {
        return (
          this.booking.name && 
          this.booking.phone && 
          this.booking.service && 
          this.booking.date && 
          this.booking.time
        );
      }
    },
    methods: {
      selectService(service) {
        this.booking.service = service.name;
        this.booking.serviceDuration = service.duration;
      },
      calculateEndTime(startTime) {
        if (!startTime || !this.booking.serviceDuration) return '';
        
        const [hours, minutes] = startTime.split(':').map(Number);
        let endHours = hours;
        let endMinutes = minutes + this.booking.serviceDuration;
        
        while (endMinutes >= 60) {
          endMinutes -= 60;
          endHours += 1;
        }
        
        // Format the time
        return `${endHours}:${endMinutes === 0 ? '00' : endMinutes}`;
      },
      formatDate(dateString) {
        if (!dateString) return '';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
      submitBooking() {
        if (!this.isFormValid) return;
        
        // Here you would typically send the data to your backend API
        console.log('Booking submitted:', this.booking);
        
        // For demonstration, we'll just show the confirmation modal
        this.showConfirmation = true;
        
        // In a real app, you would send this data to your MongoDB backend
        // this.sendToBackend(this.booking);
      },
      closeConfirmation() {
        this.showConfirmation = false;
        // Reset the form
        this.booking = {
          name: '',
          phone: '',
          service: '',
          serviceDuration: 0,
          date: '',
          time: ''
        };
      }
    }
  };
  </script>