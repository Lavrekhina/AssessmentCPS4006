import axios from "axios";

const API_KEY = "";
const BASE_URL = "https://api.openai.com/v1/chat";

if (!API_KEY) {
  console.error("API_KEY not defined");
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

  suggestNutritional: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Nutritional consultant, nutritional tips, output in JSON Array format only string, without objects",
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

  suggestMental: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a mental wellness coach. Provide personalized mental health recommendations (such as meditation, relaxation, coping strategies). " +
                "Input is on a 0–4 scale. Provide some links to meditations on youtube if it's required. " +
                "Output only a JSON array of 3 to 5 string tips, no explanation or objects.",
            },
            {
              role: "user",
              content: data,
            },
          ],
        },
        { headers: { Authorization: "Bearer " + API_KEY } }
      );

      return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error suggesting:", error);
      throw error;
    }
  },
};

export default gptService;
