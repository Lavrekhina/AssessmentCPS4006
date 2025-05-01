import axios from 'axios';

const APP_ID = '47379841'
const APP_KEY = 'd28718060b8adfd39783ead254df7f92'
const BASE_URL = 'https://api.edamam.com/api';

if (!APP_KEY || !APP_ID) {
    console.error('API_KEY or APP_ID not defined');
}

const nutritionService = {
    checkIngridients: async (ingridient) => {
        try {
            const response = await axios.get(`${BASE_URL}/nutrition-data`, {
                params: {
                    app_id: APP_ID,
                    app_key: APP_KEY,
                    ingr: ingridient
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching nutrition info:', error);
            return undefined;
        }
    },
    analyzeNutrition: async (ingridient) => {
        try {
            const response = await axios.post(`${BASE_URL}/nutrition-details`, {
                ingr: [ingridient]
            }, {
                params: {
                    app_id: APP_ID,
                    app_key: APP_KEY,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching nutrition info:', error);
            return undefined;
        }
    }
};

export default nutritionService;