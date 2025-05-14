import axios from "./axios";

export default function useData() {

    async function post(url, data, setData, retries = 5) {
        try {
            const response = await axios.post(url, data);

            if (response.data.data) {
                setData(response.data.data);
            } else {
                setData(response.data);
            }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);

            if (retries > 0) {
                console.log(`Retrying... (${retries} retries left)`);
                return post(url, data, setData, retries - 1);
            } else {
                console.log('No more retries left.');
                throw error;
            }
        }
    }

    async function get(url, setData, retries = 5) {
        try {
            const response = await axios.get(url);

            if (response.data.data) {
                setData(response.data.data);
            } else {
                setData(response.data);
            }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);

            if (retries > 0) {
                console.log(`Retrying... (${retries} retries left)`);
                return get(url, setData, retries - 1);
            } else {
                console.log('No more retries left.');
                throw error;
            }
        }
    }

    return {
        post,
        get
    }
}