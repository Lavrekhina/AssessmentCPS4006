import axios from "axios";

const API_KEY =
  "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";
const BASE_URL = "https://api.openai.com/v1/chat";

if (!API_KEY) {
  console.error('API_KEY not defined');
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
      console.error("Error suggesting:", error);
      throw error;
    }
  },

  suggestNutritional: async (data ) => {
    try {
      const response = await axios.post(
          `${BASE_URL}/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "Nutritional consultant, nutritional tips, output in JSON Array format only string, without objects",
              },
              {
                role: "user",
                content: `Read the the next information about nutritional analyze ${data} and suggest some tips, 
                answer in json array format`,
              },
            ],
          },
          { headers: { Authorization: "Bearer " + API_KEY } }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error suggesting:", error);
      throw error;
    }
  },
};

export default gptService;
