<script setup>
import navbar from '@/components/Navbar.vue'
import hero from '@/components/Hero.vue'
import bikeCard from '@/components/BikeCard.vue'
import FooterForm from '@/components/FooterForm.vue'
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
            <label for="motorcycleType" class="block text-sm font-medium text-gray-700"
              >Motorcycle Type</label
            >
            <select
              id="motorcycleType"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>Choose...</option>
            </select>
          </div>

          <div class="mb-4">
            <p class="mb-2 font-semibold">Rental Package</p>
            <div class="flex items-center mb-2">
              <input type="radio" id="all" name="rentalPackage" checked class="mr-2" />
              <label for="all" class="text-gray-700">All Rental Packages</label>
            </div>
            <div class="flex items-center mb-2">
              <input type="radio" id="expat" name="rentalPackage" class="mr-2" />
              <label for="expat" class="text-gray-700">Expat (11)</label>
            </div>
            <div class="flex items-center mb-2">
              <input type="radio" id="one-way" name="rentalPackage" class="mr-2" />
              <label for="one-way" class="text-gray-700">One-Way (11)</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="tourist" name="rentalPackage" class="mr-2" />
              <label for="tourist" class="text-gray-700">Tourist (18)</label>
            </div>
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
            <div class="mt-6">
              <p>Reset</p>
            </div>
          </div>
        </div>

        <!-- Bike Listing Section -->
        <div class="w-full md:w-2/3 lg:w-3/4">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <!-- Bikes -->
            <bike-card />
            <bike-card />
            <bike-card />
            <bike-card />

            <!-- More bikes can be added following the same structure -->
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
