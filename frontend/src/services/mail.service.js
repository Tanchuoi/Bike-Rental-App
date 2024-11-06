import axios from 'axios'

const sendMail = async (email) => {
  try {
    const response = await axios.post('/api/sendSubscriptionMail', { to: email })
    return response.data.message
  } catch (error) {
    return 'Failed to send email'
  }
}

const sendReceiptMail = async ({
  to,
  subject,
  city,
  quantity,
  startDate,
  rentalDuration,
  rentalEnd,
  name,
  phoneNumber,
  message,
  bikeName, // New parameter for bike name
  bikePrice, // New parameter for bike price
  bikeImage, // New parameter for bike image URL
  totalPrice
}) => {
  try {
    const response = await axios.post('/api/sendReceiptMail', {
      to,
      subject,
      city,
      quantity,
      startDate,
      rentalDuration,
      rentalEnd,
      name,
      phoneNumber,
      message,
      bikeName, // Pass the bike name to the backend
      bikePrice, // Pass the bike price to the backend
      bikeImage, // Pass the bike image URL to the backend
      totalPrice
    })
    return response.data.message
  } catch (error) {
    return 'Failed to send email'
  }
}

export { sendMail, sendReceiptMail }
