import { defineStore } from 'pinia'
import axios from 'axios'

const useBikesStore = defineStore('bikes', {
  state: () => ({
    bikes: [],
    bike: null, // Initially set to null, indicating no bike is selected
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchBikes() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get('/api/bikes')
        this.bikes = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to load bikes' // Set a user-friendly error message
      } finally {
        this.isLoading = false
      }
    },
    async fetchBikeById(id) {
      this.bike = null // Clear the previous bike data
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.get(`/api/bike/${id}`)
        this.bike = response.data // Set the bike data in the store
      } catch (error) {
        console.error(error)
        this.error = `Failed to load bike with id ${id}`
      } finally {
        this.isLoading = false
      }
    },
    async fetchFilteredBikes({ type = '', brand = '', sortField = '', sortDirection = '' }) {
      this.isLoading = true
      this.error = null
      try {
        // Construct query string
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (brand) params.append('brand', brand)
        if (sortField) params.append('sortField', sortField)
        if (sortDirection) params.append('sortDirection', sortDirection)

        const response = await axios.get(`/api/bikes/filter?${params.toString()}`)
        this.bikes = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to load filtered bikes'
      } finally {
        this.isLoading = false
      }
    },

    async deleteBike(id) {
      this.isLoading = true
      this.error = null
      try {
        if (!confirm('Are you sure you want to delete this bike?')) {
          return
        }
        await axios.delete(`/api/bike/${id}`)
        this.bikes = this.bikes.filter((bike) => bike.id !== id)
      } catch (error) {
        console.error(error)
        this.error = 'Failed to delete bike'
      } finally {
        this.isLoading = false
      }
    },

    async addBike(bikeData) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/api/bike', bikeData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Important for file upload
          }
        })
        this.bikes.push(response.data) // Make sure you're pushing the received bike data
      } catch (error) {
        console.error(error)
        this.error = 'Failed to add bike'
      } finally {
        this.isLoading = false
      }
    },

    async updateBike(id, bikeData) {
      this.isLoading = true
      this.error = null
      try {
        await axios.put(`/api/bike/${id}`, bikeData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        const index = this.bikes.findIndex((bike) => bike.id === id)
        if (index !== -1) {
          this.bikes[index] = { ...this.bikes[index], ...bikeData }
        }
      } catch (error) {
        console.error(error)
        this.error = 'Failed to update bike'
      } finally {
        this.isLoading = false
      }
    }
  }
})
export default useBikesStore
