<script setup>
import { ref } from 'vue'

const activeTab = ref('dashboard')
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' }
])

const bikes = ref([
  {
    id: 1,
    name: 'Honda CB500X',
    brand: 'Honda',
    engine: '471cc',
    gasCapacity: '17.7L',
    description: 'Adventure bike',
    priceByDay: 50,
    type: 'Adventure',
    status: 'Available'
  },
  {
    id: 2,
    name: 'Yamaha MT-07',
    brand: 'Yamaha',
    engine: '689cc',
    gasCapacity: '14L',
    description: 'Naked bike',
    priceByDay: 45,
    type: 'Naked',
    status: 'Available'
  },
  {
    id: 3,
    name: 'BMW R1250GS',
    brand: 'BMW',
    engine: '1254cc',
    gasCapacity: '20L',
    description: 'Touring bike',
    priceByDay: 100,
    type: 'Touring',
    status: 'Unavailable'
  }
])

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const deleteUser = (userId) => {
  // Handle user delete logic here
  alert(`Delete user with ID: ${userId}`)
}

const updateBike = (bikeId) => {
  // Handle bike update logic here
  alert(`Update bike with ID: ${bikeId}`)
}

const deleteBike = (bikeId) => {
  // Handle bike delete logic here
  bikes.value = bikes.value.filter((bike) => bike.id !== bikeId)
}
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 text-white bg-gray-800">
      <div class="p-4 text-2xl font-bold">
        <RouterLink to="/"><i class="fa-solid fa-house-user"></i></RouterLink> Admin
      </div>
      <nav class="mt-4">
        <ul>
          <li>
            <button
              @click="setActiveTab('dashboard')"
              :class="{ 'bg-gray-700': activeTab === 'dashboard' }"
              class="w-full px-4 py-2 text-left"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('users')"
              :class="{ 'bg-gray-700': activeTab === 'users' }"
              class="w-full px-4 py-2 text-left"
            >
              Users
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('bikes')"
              :class="{ 'bg-gray-700': activeTab === 'bikes' }"
              class="w-full px-4 py-2 text-left"
            >
              Bikes
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('rentals')"
              :class="{ 'bg-gray-700': activeTab === 'rentals' }"
              class="w-full px-4 py-2 text-left"
            >
              Rentals
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100">
      <div v-if="activeTab === 'dashboard'">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <!-- Number of users -->
          <div class="grid p-4 mt-4 bg-white rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-user"></i>User</h2>
            <p class="p-2 font-bold">1</p>
          </div>
          <!-- Number of bikes -->
          <div class="grid p-4 mt-4 bg-white rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-motorcycle"></i>Bikes</h2>
            <p class="p-2 font-bold">2</p>
          </div>
          <!-- Number of Location/Store -->
          <div class="grid p-4 mt-4 bg-white rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-location-dot"></i>Stores</h2>
            <p class="p-2 font-bold">3</p>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'users'">
        <h1 class="text-3xl font-bold">Users</h1>
        <table class="w-full mt-4 bg-white rounded-lg shadow">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 text-left">ID</th>
              <th class="p-2 text-left">Name</th>
              <th class="p-2 text-left">Email</th>
              <th class="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="p-2">{{ user.id }}</td>
              <td class="p-2">{{ user.name }}</td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">
                <button
                  @click="deleteUser(user.id)"
                  class="px-2 py-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="activeTab === 'bikes'">
        <h1 class="text-3xl font-bold">Bikes</h1>
        <!-- Add Bike Form -->

        <!-- Bike List Table -->
        <table class="w-full mt-4 bg-white rounded-lg shadow">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 text-left">ID</th>
              <th class="p-2 text-left">Name</th>
              <th class="p-2 text-left">Type</th>
              <th class="p-2 text-left">Price</th>
              <th class="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bike in bikes" :key="bike.id">
              <td class="p-2">{{ bike.id }}</td>
              <td class="p-2">
                <input v-model="bike.name" type="text" class="w-full p-1 border rounded" />
              </td>
              <td class="p-2">
                <input v-model="bike.type" type="text" class="w-full p-1 border rounded" />
              </td>
              <td class="p-2">
                <input v-model="bike.price" type="number" class="w-full p-1 border rounded" />
              </td>

              <td class="p-2">
                <button
                  @click="updateBike(bike.id)"
                  class="px-2 py-1 mr-2 text-white bg-blue-500 rounded"
                >
                  Update
                </button>
                <button
                  @click="deleteBike(bike.id)"
                  class="px-2 py-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="activeTab === 'rentals'">
        <h1 class="text-3xl font-bold">Rentals</h1>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Sidebar styles */
aside {
  min-width: 16rem;
}

/* Active tab styles */
button.bg-gray-700 {
  background-color: #4a5568;
}
</style>
