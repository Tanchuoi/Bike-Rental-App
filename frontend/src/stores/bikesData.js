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
    }
  }
})
export default useBikesStore
