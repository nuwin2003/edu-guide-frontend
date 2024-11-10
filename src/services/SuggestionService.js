import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/stream",
});

const SuggestionService = {

    // Stream Suggest
    suggestStream: async (requestBody) => {

        try {
            const response = await axiosInstance.post('/suggest', requestBody);
            return response.data;
        } catch (error) {
            console.error("Error on Stream Suggest", error);
            throw error;
        }
    },
};

export default SuggestionService;