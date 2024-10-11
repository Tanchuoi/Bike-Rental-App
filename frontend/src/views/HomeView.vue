<script setup>
// import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import FooterForm from '@/components/FooterForm.vue'
import BikeCard from '@/components/BikeCard.vue'

// import { onMounted } from 'vue'
</script>

<template>
  <body class="bg-gray-100">
    <!-- Navbar -->
    <navbar />
    <!-- Hero -->
    <Hero />

    <!-- Motorcycle Rentals -->
    <section id="bikeRental" class="w-full py-16 bg-white">
      <div class="container grid grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        <div class="col-span-1 p-3 bg-white">
          <h1 class="text-4xl font-bold">Motorcycle Rentals</h1>
          <p class="py-4 text-xl">
            Professionally maintained late-model Honda, Royal Enfield, BMW and Yamaha motorcycles.
          </p>
          <i class="py-2 pt-2 fa-solid fa-circle-check"></i> Garages in Hanoi, Danang and HCM City
          <br />
          <i class="py-2 pt-2 fa-solid fa-circle-check"></i> Save money with awesome Tourist and
          Expat deals
          <br />
          <i class="py-2 pt-2 fa-solid fa-circle-check"></i> One-Way Rental, Guides and Damage
          Waiver add-ons availble
        </div>
        <div class="flex items-center justify-center col-span-2 bg-white">
          <!-- bike  -->
          <BikeCard />
          <BikeCard />
        </div>
      </div>

      <routerLink to="bikes-list" class="float-right p-4 font-semibold"
        >All Motorcycle Rentals >></routerLink
      >
    </section>

    <!-- Motorcycle Location -->
    <section id="location" class="py-16 bg-gray-100">
      <div class="container mx-auto">
        <h2 class="mb-8 text-3xl font-bold text-center">Motorcycle Locations</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- Location 1 -->
          <div class="p-6 bg-white rounded-lg shadow-lg">
            <div id="map"></div>
            <!-- Google Map container -->
          </div>
        </div>
      </div>
    </section>

    <FooterForm />
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js"></script> -->
  </body>
</template>

<style scoped></style>
