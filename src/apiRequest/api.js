const BASE_URL = 'https://fakestoreapi.com';

export async function getData(endpoint) {
    const url = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to handle POST requests
export async function postData(endpoint, payload) {
    const url = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers your API requires here, e.g., Authorization
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}
