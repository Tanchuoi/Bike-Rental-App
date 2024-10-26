<script setup>
import { onMounted } from 'vue'

import navbar from '@/components/Navbar.vue'
import hero from '@/components/Hero.vue'
import bikeCard from '@/components/BikeCard.vue'
import FooterForm from '@/components/FooterForm.vue'
import useBikeStore from '@/stores/bikesData.js'

let bikesStore = useBikeStore()

onMounted(() => {
  bikesStore.fetchBikes()
  console.log(bikesStore.bikes)
})
</script>

<template>
  <navbar />
  <hero />
  <body class="px-4 py-12 bg-white">
    <!-- Wrapper Container -->
    <div class="container mx-auto">
      <!-- Sort and Filter Section -->
      <div class="block md:flex md:space-x-6">
        <!-- Sort/Filter (On mobile/tablet goes on top) -->
        <div class="w-full p-4 mb-6 bg-white md:w-1/3 lg:w-1/4 md:mb-0">
          <div class="mb-4">
            <label for="sort" class="block text-sm font-medium text-gray-700">Sort</label>
            <select
              id="sort"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>Sort bikes...</option>
            </select>
          </div>

          <div class="mb-4">
            <p class="mb-2 font-semibold">Transmission</p>
            <div class="flex items-center mb-2">
              <input type="checkbox" id="auto" class="mr-2" />
              <label for="auto" class="text-gray-700">Automatic (6)</label>
            </div>
            <div class="flex items-center mb-2">
              <input type="checkbox" id="manual" class="mr-2" />
              <label for="manual" class="text-gray-700">Manual (7)</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="semi-auto" class="mr-2" />
              <label for="semi-auto" class="text-gray-700">Semi-Automatic (5)</label>
            </div>
          </div>

          <div>
            <p class="mb-2 font-semibold">Brand</p>
            <div class="flex items-center mb-2">
              <input type="checkbox" id="bmw" class="mr-2" />
              <label for="bmw" class="text-gray-700">BMW (1)</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="honda" class="mr-2" />
              <label for="honda" class="text-gray-700">Honda (4)</label>
            </div>
          </div>
          <div>
            <button class="mt-6">
              <p>Reset</p>
            </button>
          </div>
        </div>

        <!-- Bike Listing Section -->
        <div class="w-full md:w-2/3 lg:w-3/4">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <!-- Bikes -->
            <bikeCard
              v-for="bike in bikesStore.bikes"
              :key="bike.id"
              :id="bike.id"
              :name="bike.bike_name"
              :brand="bike.brand"
              :description="bike.description"
              :priceByDay="bike.price_by_day"
              :type="bike.type"
              :status="bike.status"
              :image="bike.image"
              :overview="bike.overview"
              :maxEngine="bike.max_engine"
              :gasCapicity="bike.gas_capicity"
            />
          </div>
          <!-- Pagination -->
          <div class="flex items-center justify-center py-16">
            <router-link class="p-3">Previous</router-link>
            <router-link class="p-3">1</router-link>
            <router-link class="p-3">2</router-link>
            <router-link class="p-3">3</router-link>
            <router-link class="p-3">Next</router-link>
          </div>
        </div>
      </div>
    </div>
  </body>
  <FooterForm />
</template>
