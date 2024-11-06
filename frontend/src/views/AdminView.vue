<script setup>
import { onMounted, ref } from 'vue'
import useUserStore from '@/stores/userData'
import useBikeStore from '@/stores/bikesData'
import useRentalStore from '@/stores/rentalData'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'

import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
const toast = useToast()

const showSuccessToast = (message) => {
  toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 })
}

const showErrorToast = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

let userStore = useUserStore()
let bikeStore = useBikeStore()
let rentalStore = useRentalStore()

const backendUrl = 'http://localhost:3000'
const visible = ref(false) //Bike modal visibility

// Change active tab
const activeTab = ref('dashboard')
const setActiveTab = (tab) => {
  activeTab.value = tab
}

const typeOptions = ['automatic', 'semi-auto', 'manual']
const statusOptions = ['available', 'rented']
const brandOptions = ['BMW', 'Honda', 'Royal Enfield', 'Yamaha']

const newBike = ref({
  bike_name: '',
  brand: '',
  type: '',
  status: '',
  description: '',
  overview: '',
  price_by_day: null,
  max_engine: null,
  gas_capacity: null,
  image: null
})

onMounted(() => {
  userStore.getUsers()
  bikeStore.fetchBikes()
  rentalStore.fetchRentals()
})

//Delete user
const deleteUser = async (userId) => {
  try {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }
    showSuccessToast('User deleted successfully')
    await userStore.deleteUser(userId)
    rentalStore.fetchRentals()
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to delete user: ' + (error.response?.data?.message || 'Unknown error'))
  }
}

//Add new bike
const addBike = async () => {
  const formData = new FormData()
  for (const key in newBike.value) {
    formData.append(key, newBike.value[key])
  }

  console.log('Form data before sending:', Object.fromEntries(formData))

  try {
    formData.delete('previewImage') // Remove the preview image from the form data
    await bikeStore.addBike(formData) // Ensure this method accepts FormData
    visible.value = false // Close the dialog after adding
    newBike.value = {
      bike_name: '',
      brand: '',
      type: '',
      status: '',
      description: '',
      overview: '',
      price_by_day: null,
      max_engine: null,
      gas_capacity: null,
      image: null
    }
    showSuccessToast('Bike added successfully')
    //fetch bikes
    bikeStore.fetchBikes()
    //formdata data
    console.log('Form data after sending:', Object.fromEntries(formData))
  } catch (error) {
    showErrorToast('Failed to add bike: ' + (error.response?.data?.message || 'Unknown error'))
    console.error(error)
  }
}

//Delete bike
const deleteBike = async (bikeId) => {
  try {
    if (!confirm('Are you sure you want to delete this bike?')) {
      return
    }
    await bikeStore.deleteBike(bikeId)
    showSuccessToast('Bike deleted successfully')
    rentalStore.fetchRentals()
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to delete bike: ' + (error.response?.data?.message || 'Unknown error'))
  }
}

// Update bike
const updateBike = async (bikeId) => {
  const bike = bikeStore.bikes.find((b) => b.id === bikeId)
  const formData = new FormData()

  // Append only necessary fields
  for (const key in bike) {
    if (key !== 'previewImage') {
      // Exclude previewImage if it exists
      formData.append(key, bike[key])
    }
  }

  try {
    if (!confirm('Are you sure you want to update this bike?')) {
      return
    }
    showSuccessToast('Bike updated successfully')
    await bikeStore.updateBike(bikeId, formData) // Ensure this method accepts FormData
    bikeStore.fetchBikes() // Refresh the bike list
    rentalStore.fetchRentals() // Refresh the rental list
  } catch (error) {
    console.error(error)
    alert('Failed to update bike: ' + (error.response?.data?.message || 'Unknown error'))
  }
}

// Updated onImageChange method to handle specific bike object
const onImageChange = (event, bike = null) => {
  const file = event.target.files[0]
  if (file) {
    if (bike) {
      bike.image = file
    } else {
      newBike.value.image = file
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      if (bike) {
        bike.previewImage = e.target.result
      } else {
        newBike.value.previewImage = e.target.result
      }
    }
    reader.readAsDataURL(file)
  }
}

// Triggers file input for specific bike ID
const triggerFileUpload = (bikeId = null) => {
  const imageInput = bikeId
    ? document.getElementById(`image-input-${bikeId}`)
    : document.getElementById('image-input-add')
  if (imageInput) {
    imageInput.click()
  }
}

// Method to get the image URL, prioritizing the preview
const getImageUrl = (bike) => {
  return bike.previewImage || `${backendUrl}${bike.image}`
}

//Delete rental
const deleteRental = async (rentalId) => {
  try {
    if (!confirm('Are you sure you want to delete this rental?')) {
      return
    }
    await rentalStore.deleteRental(rentalId)
    showSuccessToast('Rental deleted successfully')
    rentalStore.fetchRentals()
  } catch (error) {
    console.error(error)
    showErrorToast('Failed to delete rental: ' + (error.response?.data?.message || 'Unknown error'))
  }
}
</script>

<template>
  <Toast />
  <div class="flex h-svh">
    <!-- Sidebar -->
    <aside class="w-64 text-white bg-gray-800 min-w-64">
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
          <div class="grid p-4 mt-4 bg-orange-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-user"></i>User</h2>
            <p class="p-2 text-xl font-bold">{{ userStore.users.length }}</p>
          </div>
          <!-- Number of bikes -->
          <div class="grid p-4 mt-4 bg-blue-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-motorcycle"></i>Bikes</h2>
            <p class="p-2 text-xl font-bold">{{ bikeStore.bikes.length }}</p>
          </div>
          <!-- Number of Location/Store -->
          <div class="grid p-4 mt-4 bg-green-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-inbox"></i>Rentals</h2>
            <p class="p-2 text-xl font-bold">{{ rentalStore.rentals.length }}</p>
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
              <th class="p-2 text-left">Role</th>
              <th class="p-2 text-left">Created At</th>
              <th class="p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userStore.users" :key="user.id">
              <td class="p-2">{{ user.id }}</td>
              <td class="p-2">{{ user.username }}</td>
              <td class="p-2">{{ user.role }}</td>
              <td class="p-2">{{ user.created_at }}</td>
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
        <div class="flex justify-between">
          <h1 class="text-3xl font-bold">Bikes</h1>
          <!-- Add Bike Modal -->
          <Button class="mb-4" label="Add new bike " @click="visible = true" />
          <Dialog
            v-model:visible="visible"
            maximizable
            modal
            header="Add a new bike"
            :style="{ width: '25rem' }"
          >
            <form @submit.prevent="addBike">
              <div class="flex items-center gap-4 mb-4">
                <label for="bike_name" class="w-24 font-semibold">Name</label>
                <InputText required v-model="newBike.bike_name" id="bike_name" class="flex-auto" />
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="brand" class="w-24 font-semibold">Brand</label>
                <select
                  required
                  v-model="newBike.brand"
                  class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                >
                  <option
                    v-for="brandOption in brandOptions"
                    :key="brandOption"
                    :value="brandOption"
                  >
                    {{ brandOption }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="type" class="w-24 font-semibold">Type</label>
                <select
                  required
                  v-model="newBike.type"
                  class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                >
                  <option v-for="typeOption in typeOptions" :key="typeOption" :value="typeOption">
                    {{ typeOption }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="status" class="w-24 font-semibold">Status</label>
                <select
                  required
                  v-model="newBike.status"
                  class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                >
                  <option
                    v-for="statusOption in statusOptions"
                    :key="statusOption"
                    :value="statusOption"
                  >
                    {{ statusOption }}
                  </option>
                </select>
              </div>
              <div class="flex items-center gap-4 mb-4">
                <label for="description" class="w-24 font-semibold">Description</label>
                <textarea
                  required
                  v-model="newBike.description"
                  id="description"
                  class="flex-auto border-[#94a3b8] border-solid border rounded"
                ></textarea>
              </div>
              <div class="flex items-center gap-4 mb-4">
                <label for="overview" class="w-24 font-semibold">Overview</label>
                <textarea
                  required
                  v-model="newBike.overview"
                  id="overview"
                  class="flex-auto border-[#94a3b8] border-solid border rounded"
                ></textarea>
              </div>
              <div class="flex items-center gap-4 mb-4">
                <label for="price" class="w-24 font-semibold">Price</label>
                <InputNumber required v-model="newBike.price_by_day" id="price" class="flex-auto" />
              </div>
              <div class="flex items-center gap-4 mb-4">
                <label for="engine" class="w-24 font-semibold">Engine</label>
                <InputNumber required v-model="newBike.max_engine" id="engine" class="flex-auto" />
              </div>
              <div class="flex items-center gap-4 mb-4">
                <label for="gas" class="w-24 font-semibold">Gas </label>
                <InputNumber required v-model="newBike.gas_capacity" id="gas" class="flex-auto" />
              </div>
              <div class="flex items-center gap-4 mb-4">
                <label for="image" class="w-24 font-semibold">Image </label>
                <input type="file" name="image" @change="onImageChange" class="flex-auto" />
              </div>

              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  label="Cancel"
                  severity="secondary"
                  @click="visible = false"
                ></Button>
                <Button type="submit" label="Add"></Button>
              </div>
            </form>
          </Dialog>
        </div>
        <!-- Bike List Table -->
        <div class="overflow-auto max-h-[85vh] max-w-[145vh] rounded-lg border">
          <table class="w-full bg-white rounded-lg shadow">
            <thead>
              <tr class="bg-gray-200">
                <th class="p-2 text-left min-w-[50px]">ID</th>
                <th class="p-2 text-left min-w-[200px]">Name</th>
                <th class="p-2 text-left min-w-[150px]">Brand</th>
                <th class="p-2 text-left min-w-[100px]">Price</th>
                <th class="p-2 text-left min-w-[150px]">Type</th>
                <th class="p-2 text-left min-w-[150px]">Status</th>
                <th class="p-2 text-center min-w-[200px]">Image</th>
                <th class="p-2 text-left min-w-[100px]">Engine</th>
                <th class="p-2 text-left min-w-[100px]">Gas Capacity</th>
                <th class="p-2 text-left min-w-[200px]">Overview</th>
                <th class="p-2 text-left min-w-[200px]">Description</th>
                <th class="p-2 text-left min-w-[100px]"></th>
                <th class="p-2 text-left min-w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bike in bikeStore.bikes" :key="bike.id">
                <td class="p-2">{{ bike.id }}</td>
                <td class="p-2">
                  <input
                    v-model="bike.bike_name"
                    type="text"
                    class="w-full p-1 border border-[#94a3b8] border-solid rounded"
                  />
                </td>
                <td class="p-2">
                  <select
                    v-model="bike.brand"
                    class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                  >
                    <option
                      v-for="brandOption in brandOptions"
                      :key="brandOption"
                      :value="brandOption"
                    >
                      {{ brandOption }}
                    </option>
                  </select>
                </td>
                <td class="p-2">
                  <input
                    v-model="bike.price_by_day"
                    type="number"
                    class="w-full p-1 border border-[#94a3b8] border-solid rounded"
                  />
                </td>
                <!-- Type Select -->
                <td class="p-2">
                  <select
                    v-model="bike.type"
                    class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                  >
                    <option v-for="typeOption in typeOptions" :key="typeOption" :value="typeOption">
                      {{ typeOption }}
                    </option>
                  </select>
                </td>

                <!-- Status Select -->
                <td class="p-2">
                  <select
                    v-model="bike.status"
                    class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                  >
                    <option
                      v-for="statusOption in statusOptions"
                      :key="statusOption"
                      :value="statusOption"
                    >
                      {{ statusOption }}
                    </option>
                  </select>
                </td>

                <!-- Image Field with preview -->
                <td class="p-2">
                  <input
                    type="file"
                    @change="onImageChange($event, bike)"
                    :id="`image-input-${bike.id}`"
                    class="hidden"
                  />
                  <img
                    :src="getImageUrl(bike)"
                    class="object-contain h-40 cursor-pointer w-80"
                    @click="triggerFileUpload(bike.id)"
                  />
                </td>

                <td class="p-2">
                  <input
                    v-model="bike.max_engine"
                    type="number"
                    class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                  />
                </td>
                <td class="p-2">
                  <input
                    v-model="bike.gas_capacity"
                    type="number"
                    class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                  />
                </td>

                <td class="p-2">
                  <textarea
                    v-model="bike.overview"
                    type="text"
                    class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                  ></textarea>
                </td>

                <td class="p-2">
                  <textarea
                    v-model="bike.description"
                    type="text"
                    class="w-full p-1 border rounded border-[#94a3b8] border-solid"
                  ></textarea>
                </td>

                <td class="p-2">
                  <button
                    @click="updateBike(bike.id)"
                    class="w-20 text-white bg-blue-500 rounded h-9"
                  >
                    Update
                  </button>
                </td>
                <td class="p-2">
                  <button
                    @click="deleteBike(bike.id)"
                    class="w-20 text-white bg-red-500 rounded h-9"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="activeTab === 'rentals'">
        <h1 class="mb-4 text-3xl font-bold">Rentals</h1>
        <div class="overflow-auto max-h-[90vh] max-w-[145vh] rounded-lg border">
          <table class="w-full bg-white rounded-lg shadow">
            <thead>
              <tr class="bg-gray-200">
                <th class="p-2 text-center min-w-[50px]">ID</th>
                <th class="p-2 text-center min-w-[18 0px]">User Name</th>
                <th class="p-2 text-center min-w-[70px]">Phone</th>
                <th class="p-2 text-center min-w-[50px]">Email</th>
                <th class="p-2 text-center min-w-[50px]">Bike Name</th>
                <th class="p-2 text-center min-w-[120px]">Start Date</th>
                <th class="p-2 text-center min-w-[120px]">End Date</th>
                <th class="p-2 text-center min-w-[50px]">City</th>
                <th class="p-2 text-center min-w-[50px]">Quantity</th>
                <th class="p-2 text-center min-w-[50px]">Total Price</th>
                <th class="p-2 text-center min-w-[200px]">Message</th>
                <th class="p-2 text-center min-w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rental in rentalStore.rentals" :key="rental.id">
                <td class="p-2 text-center">{{ rental.id }}</td>
                <td class="p-2 text-center">{{ rental.user_name }}</td>
                <td class="p-2 text-center">{{ rental.phone_number }}</td>
                <td class="p-2 text-center">{{ rental.email }}</td>
                <td class="p-2 text-center">{{ rental.bike_name }}</td>
                <td class="p-2 text-center">{{ rental.rental_start }}</td>
                <td class="p-2 text-center">{{ rental.rental_end }}</td>
                <td class="p-2 text-center">{{ rental.city }}</td>
                <td class="p-2 text-center">{{ rental.quantity }}</td>
                <td class="p-2 text-center">${{ rental.total_price }}</td>
                <td class="p-2 text-left">{{ rental.message }}</td>
                <td class="p-2 text-center">
                  <button
                    @click="deleteRental(rental.id)"
                    class="w-20 text-white bg-red-500 rounded h-9"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Active tab styles */
button.bg-gray-700 {
  background-color: #4a5568;
}
</style>
