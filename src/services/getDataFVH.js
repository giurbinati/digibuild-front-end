import axios from 'axios';

const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_DATE_DataFVH = config.host + "/categories";

class GetData {
    // Metodo per fetchare le categorie
     async getCategories(indexCategory, indexService) {
        try {
            const response = await axios.get(API_URL_DATE_DataFVH); // Cambia l'URL se necessario
            
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            // Estrai i dati usando gli indici forniti
            const categories = response.data[0].categories;

            // Se indexService è fornito, accedi a tableData attraverso services
            if (typeof indexService !== 'undefined') {
                return categories[indexCategory].services[indexService].tableData;
            } else {
                // Se indexService non è fornito, restituisci tutte le categorie
                return categories[indexCategory].tableData; // Assumendo che esista un tableData a questo livello
            }
        } catch (error) {
            console.error('Fetch error:', error);
            throw error; // Rilancia l'errore per la gestione nel componente
        }
    }
}

export default new GetData();
