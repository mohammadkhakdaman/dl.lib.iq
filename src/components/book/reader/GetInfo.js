import axios from "@/utils/axios";

export const GetInfo = async (book_id) => {

    try {
        const response = await axios.get(`http://dl.lib.iq/viewer/?${book_id}/${page}`);
        // const response = await axios.get(`https://api.lib.iq/books/${book_id}`);

        return response.data?._source;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error;
    }
}