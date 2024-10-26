import axios from 'axios'

const sendMail = async (email) => {
  try {
    const response = await axios.post('/api/sendMail', { to: email })
    return response.data.message
  } catch (error) {
    return 'Failed to send email'
  }
}

export { sendMail }
