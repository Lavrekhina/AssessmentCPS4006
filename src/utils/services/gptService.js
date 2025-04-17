import axios from "axios";

const API_KEY =
  "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";
const BASE_URL = "https://api.openai.com/v1/chat";

if (!API_KEY) {
  console.error(
    "API_KEY не определен. Пожалуйста, добавьте VITE_NEWS_API_KEY в файл .env"
  );
}

const gptService = {
  suggest: async (symptoms = []) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "Medical consultant",
            },
            {
              role: "user",
              content: `Read the next symptoms ${symptoms.join(
                ","
              )} and suggest desease`,
            },
          ],
        },
        { headers: { Authorization: "Bearer " + API_KEY } }
      );

      return response.data;
    } catch (error) {
      console.error("Ошибка при получении новостей:", error);
      throw error;
    }
  },
};

export default gptService;
