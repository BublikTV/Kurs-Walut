const axios = require('axios');

const API_KEY = '0f94c41bf329808431608835'; 
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

async function getExchangeRates(baseCurrency) {
    try {
        const response = await axios.get(`${BASE_URL}/latest/${baseCurrency}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

module.exports = { getExchangeRates };
