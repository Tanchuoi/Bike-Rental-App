<script setup>
import { ref } from 'vue'

let isRental = ref(true)
let isDetails = ref(false)
let duration = ref(1)

const toggleRental = () => {
  isRental.value = true
  isDetails.value = false
}

const toggleDetails = () => {
  isRental.value = false
  isDetails.value = true
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
      <form v-if="isRental" class="space-y-6">
        <div>
          <label for="city" class="block font-medium">City: *</label>
          <select id="city" class="block w-full mt-2 border-gray-300 rounded-md shadow-sm">
            <option>Choose...</option>
            <option>Hanoi</option>
            <option>Danang</option>
            <option>HCMC</option>
          </select>
        </div>

        <div>
          <label class="block font-medium">Number of Motorcycles: *</label>
          <div class="flex mt-2 space-x-4">
            <label><input type="radio" name="motorcycles" value="1" /> 1</label>
            <label><input type="radio" name="motorcycles" value="2" /> 2</label>
            <label><input type="radio" name="motorcycles" value="3" /> 3</label>
            <label><input type="radio" name="motorcycles" value="4" /> 4</label>
            <label><input type="radio" name="motorcycles" value="5" /> 5</label>
          </div>
        </div>

        <div>
          <label for="start-date" class="block font-medium">Start date: *</label>
          <input
            type="date"
            id="start-date"
            class="block w-full mt-2 border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label for="duration" class="block font-medium">Rental duration:</label>
          <input
            type="range"
            id="duration"
            v-model="duration"
            min="1"
            max="30"
            class="block w-full mt-2"
          />
          <p>{{ duration }} days</p>
        </div>

        <button
          @click="toggleDetails"
          type="submit"
          class="w-full py-2 text-white bg-black rounded-md"
        >
          Next
        </button>
      </form>

      <!-- Details Form Inputs -->
      <form v-if="isDetails" class="space-y-6">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label for="first-name" class="block text-sm font-medium"
              >Name: <span class="text-red-500">*</span></label
            >
            <input
              type="text"
              id="first-name"
              class="w-full px-4 py-2 mt-2 border rounded-full"
              placeholder="First name..."
            />
          </div>
          <div>
            <input
              type="text"
              id="last-name"
              class="w-full px-4 py-2 mt-8 border rounded-full"
              placeholder="Last name..."
            />
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium"
            >Email: <span class="text-red-500">*</span></label
          >
          <input
            type="email"
            id="email"
            class="w-full px-4 py-2 mt-2 border rounded-full"
            placeholder="Your email..."
          />
        </div>

        <!-- Phone Field -->
        <div>
          <label for="phone" class="block text-sm font-medium">Phone:</label>
          <div class="relative">
            <span class="absolute left-4 top-3.5 text-gray-400">🇺🇸</span>
            <input
              type="text"
              id="phone"
              class="w-full py-2 pl-12 pr-4 mt-2 border rounded-full"
              placeholder="Your number..."
            />
          </div>
        </div>

        <!-- Message Field -->
        <div>
          <label for="message" class="block text-sm font-medium">Message:</label>
          <textarea
            id="message"
            rows="4"
            class="w-full px-4 py-2 mt-2 border rounded-lg"
            placeholder="Your message..."
          ></textarea>
        </div>

        <!-- Checkbox Field -->
        <div class="flex items-start">
          <input
            id="checkbox"
            type="checkbox"
            class="mt-1.5 h-5 w-5 text-black focus:ring-black border-gray-300 rounded"
          />
          <label for="checkbox" class="ml-2 text-sm">
            I would like to receive occasional emails containing discounts, travel inspiration, and
            special offers from Rentabike!
          </label>
        </div>

        <!-- Total -->
        <div class="p-5 text-lg font-medium">
          <span>Total:</span>
          <span>$0.00</span>
        </div>

        <!-- Submit Button -->
        <router-link to="/Thanks">
          <button type="submit" class="w-full py-3 text-white bg-black rounded-full">
            Enquire Now
          </button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btnActive {
  border-bottom: 2px solid black;
}
</style>
