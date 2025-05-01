import axios from 'axios';

const API_KEY = 'pub_81116934ff8b312a770b87febf96f6978fb87';
const BASE_URL = 'https://newsdata.io/api/1';

if (!API_KEY) {
    console.error('API_KEY not defined');
}

const newsService = {
    getLatestNews: async (query, category = 'health') => {
        try {
            const response = await axios.get(`${BASE_URL}/latest`, {
                params: {
                    q: !query? category : (query + ' ' + category),
                    category: 'health',
                    apiKey: API_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('News fetching error:', error);
            throw error;
        }
    }
};

export default newsService;