import axios from 'axios';
import config from "./global";
import { jwtDecode } from "jwt-decode";

const API_URL = config.host + "/auth/";

class AuthService {
    constructor() {
        this.role = null;
    }

    async login(data) {
        const response = await axios.post(API_URL + "login", data).then(response => {
            const token = response.data.data; // Assume che il token sia incluso nella chiave "data"
            const decodedToken = jwtDecode(token);
    
            // Verifica se il ruolo è già stato impostato
            if (!this.role) {
                this.role = decodedToken.role;
                console.log("Ruolo impostato:", this.role);
            }
    
            return response;
        }).catch(error => {
            // Gestione degli errori
            console.log(error);
            if (error.message === "Network Error") {
                error.response = {}
                error.response.message = "ERR_NETWORK"
                error.response.status = 503;
            }
            return error.response;
        });
        return response;
    };
    
    getRole() {
        return this.role;
    }
}

export default new AuthService();
