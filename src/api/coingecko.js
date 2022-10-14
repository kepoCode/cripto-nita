import axios from 'axios'
const baseUrl = 'https://api.coingecko.com/api/v3'

const getCoinsMarkets = async (params) => {
  const response = await axios.get(baseUrl + '/coins/markets', params)
  return response.data
}

const coingecko = { getCoinsMarkets }

export default coingecko
