import axios from 'axios';

const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_DATE_Forecasting = config.host + "/forecastingdatafvh";

class GetDataForecastingFVH {

    // Method to handle GET requests with authorization
    async GetDataForecasting(section, floor, room) {
        try {
            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME")
            const url = new URL(API_URL_DATE_Forecasting);
            if (section) url.searchParams.append('section', section);
            if (floor) url.searchParams.append('floor', floor);
            if (room) url.searchParams.append('room', room);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
            console.log(response)

            console.log(response.status)

            if (response.status === 401) {
                throw new Error('Unauthorized'); // Throw an error to indicate unauthorized access
            }

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            //console.log(responseData)
            return responseData;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

export default new GetDataForecastingFVH();
