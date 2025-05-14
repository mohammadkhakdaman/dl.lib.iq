import axios from "@/utils/axios";

export const GetPages = async (book_id, page) => {

    try {
        const response = await axios.get(`https://dl.lib.iq/viewer/?${book_id}/${page}`);
        // const response = await axios.get(`https://api.lib.iq/pages/${book_id}/${page}`);

        return response.data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error;
    }
}