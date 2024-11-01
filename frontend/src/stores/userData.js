import { defineStore } from 'pinia'
import axios from 'axios'

const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async login({ username, password }) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axios.post('/api/login', { username, password })
        this.user = response.data
      } catch (error) {
        console.error(error)
        this.error = 'Invalid credentials'
      } finally {
        this.isLoading = false
      }
    },
    async register({ username, password }) {
      this.isLoading = true
      this.error = null
      try {
        await axios.post('/api/register', { username, password })
        this.user = { username }
      } catch (error) {
        console.error(error)
        this.error = 'Username already exists'
      } finally {
        this.isLoading = false
      }
    }
  }
})

export default useUserStore
