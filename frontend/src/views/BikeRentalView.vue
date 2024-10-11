<script setup>
import Navbar from '@/components/Navbar.vue'
import BookingForm from '@/components/BookingForm.vue'
import FooterForm from '@/components/FooterForm.vue'
</script>

<template>
  <Navbar />
  <div class="container px-6 py-40 mx-auto">
    <!-- Bike Details Section (Left) -->
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <!-- Bike Information -->
      <div class="space-y-6">
        <h2 class="text-4xl font-bold">HONDA CRF 300</h2>
        <p class="text-xl">$55/day</p>
        <p>Hanoi. Danang. HCMC.</p>
        <img src="../assets/img/bike/1.jpg" alt="Honda CRF 300" class="w-full h-auto" />
        <p class="text-gray-600">
          The Honda CRF 300 is a dual-sport: essentially a street-legal dirt bike. It's also one of
          Honda’s best-selling motorcycles ever. While not the most comfortable over long distances,
          it’s absolutely amazing on the dirt. Honda CRF 300 motorcycle rental is available in
          Hanoi, Danang, and Ho Chi Minh City.
        </p>

        <ul class="space-y-2">
          <li>🏍 <strong>Tourist Rental:</strong> <span class="text-green-500">yes</span></li>
          <li>🏍 <strong>One-Way Rental:</strong> <span class="text-green-500">yes</span></li>
          <li>🏍 <strong>Expat Rental:</strong> <span class="text-red-500">no</span></li>
        </ul>

        <button class="px-4 py-2 text-white bg-black rounded-md">Pricing Details</button>
      </div>
      <BookingForm />
    </div>
  </div>
  <FooterForm />
</template>
<style></style>
