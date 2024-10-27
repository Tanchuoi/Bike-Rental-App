<script setup>
import { ref } from 'vue'

let isRental = ref(true)
let isDetails = ref(false)
let duration = ref(1)

const email = ref('')
const city = ref('')
const motorcycleCount = ref(null)
const startDate = ref('')

const toggleRental = () => {
  isRental.value = true
  isDetails.value = false
}

const toggleDetails = () => {
  if (validateRentalForm()) {
    isRental.value = false
    isDetails.value = true
  }
}

const validateRentalForm = () => {
  if (!city.value || !motorcycleCount.value || !startDate.value) {
    alert('Please fill in all required fields')
    return false
  }
  return true
}

const handleSubmit = (event) => {
  event.preventDefault() // Ensure it prevents default submission
  console.log('Form submitted')
}
</script>

<template>
  <div>
    <!-- Booking Section (Right) -->
    <div class="space-y-6">
      <h2 class="text-3xl font-bold">BOOK NOW</h2>
      <div class="border-b border-gray-300">
        <ul class="flex space-x-4 text-lg">
          <li class="pb-2 border-b-2 border-black">
            <button :class="{ btnActive: isRental }" @click="toggleRental()">Rental</button>
          </li>
          <li class="pb-2 border-b-2 border-black">
            <button :class="{ btnActive: isDetails }" @click="toggleDetails()">Details</button>
          </li>
        </ul>
      </div>

      <!-- Rental Form Inputs -->
      <form v-if="isRental" @submit.prevent="toggleDetails" class="space-y-6">
        <div>
          <label for="city" class="block font-medium border-black border-solid">
            City: <span class="font-bold text-red-500">*</span>
          </label>
          <select
            v-model="city"
            required
            id="city"
            placeholder="Choose..."
            class="block w-full px-4 mt-2 border-gray-300 rounded-md shadow-sm borderForm"
          >
            <option value="">Choose...</option>
            <option>Hanoi</option>
            <option>Danang</option>
            <option>HCMC</option>
          </select>
        </div>

        <div>
          <label class="block font-medium">
            Number of Motorcycles: <span class="font-bold text-red-500">*</span>
          </label>
          <div class="flex mt-2 space-x-4">
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="1"
              />
              1</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="2"
              />
              2</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="3"
              />
              3</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="4"
              />
              4</label
            >
            <label
              ><input
                v-model="motorcycleCount"
                type="radio"
                required
                name="motorcycles"
                value="5"
              />
              5</label
            >
          </div>
        </div>

        <div>
          <label for="start-date" class="block font-medium">
            Start date: <span class="font-bold text-red-500">*</span>
          </label>
          <input
            v-model="startDate"
            required
            type="date"
            id="start-date"
            class="block w-full p-4 mt-2 border-gray-300 rounded-md shadow-sm borderForm"
          />
        </div>

        <div>
          <label for="duration" class="block font-medium">
            Rental duration: <span class="font-bold text-red-500">*</span>
          </label>
          <input
            required
            type="range"
            id="duration"
            v-model="duration"
            min="1"
            max="30"
            class="block w-full mt-2"
          />
          <p>{{ duration }} days</p>
        </div>

        <button type="submit" class="w-full py-2 text-white bg-black rounded-md">Next</button>
      </form>

      <!-- Details Form Inputs -->
      <form v-if="isDetails" class="space-y-6 smoother">
        <div class="">
          <div>
            <label for="first-name" class="block text-base font-medium"
              >Name: <span class="font-bold text-red-500">*</span></label
            >
            <input
              required
              type="text"
              id="first-name"
              class="w-full px-4 py-2 mt-2 border rounded-full borderForm"
              placeholder="Your name..."
            />
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-base font-medium"
            >Email: <span class="font-bold text-red-500">*</span></label
          >
          <input
            required
            type="email"
            id="email"
            class="w-full px-4 py-2 mt-2 border rounded-full borderForm"
            placeholder="Your email..."
          />
        </div>

        <!-- Phone Field -->
        <div>
          <label for="phone" class="block text-base font-medium"
            >Phone: <span class="font-bold text-red-500">*</span></label
          >
          <div class="relative">
            <input
              required
              type="text"
              id="phone"
              class="w-full px-4 py-2 pr-4 mt-2 border rounded-full borderForm"
              placeholder="Your number..."
            />
          </div>
        </div>

        <!-- Message Field -->
        <div>
          <label for="message" class="block text-base font-medium">Message:</label>
          <textarea
            id="message"
            rows="4"
            class="w-full px-4 py-2 mt-2 border rounded-lg borderForm"
            placeholder="Your message..."
          ></textarea>
        </div>

        <!-- Total -->
        <div class="py-10 text-lg font-medium">
          <span>Total:</span>
          <span>$0.00</span>
        </div>

        <!-- Submit Button -->

        <button
          @click="handleSubmit"
          type="submit"
          class="w-full py-3 text-white bg-black rounded-full"
        >
          Enquire Now
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btnActive {
  border-bottom: 2px solid black;
}

.borderForm {
  /* display: flex;
  align-items: center;
  justify-content: center; */
  border: 2px solid black;
  height: 50px;
  border-radius: 25px;
}
</style>
