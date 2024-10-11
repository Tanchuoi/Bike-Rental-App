<template>
  <div class="w-[400px]">
    <h1 class="p-2 text-4xl font-bold">Honda Vision</h1>
    <p class="ml-2 font-semibold">55$/day</p>
    <img src="../assets/img/bike/1.jpg" alt="Honda Vision" class="object-cover w-full h-48 p-2" />
    <p class="px-2 py-3">Morden, convinient</p>
    <div class="flex items-center content-center">
      <i class="ml-2 mr-2 fa-solid fa-gas-pump"></i>
      <p class="mr-20">4.6 litres</p>
      <i class="ml-2 mr-2 fa-solid fa-gauge-high"></i>
      <p>110 cc</p>
    </div>

    <router-link to="bike-rental/1">
      <button
        class="mx-2 my-4 text-white transition ease-linear delay-75 bg-black border-2 border-black border-solid rounded-xl btn hover:bg-white hover:text-black h-9 w-96"
      >
        Book Now
      </button>
    </router-link>
  </div>
</template>

<style scoped></style>
