import axios from 'axios';

const config = {
    host: process.env.REACT_APP_API_HOST,
};

const API_URL_DATE_PutDataFVH = config.host + "/putcategories";

class putDataFVH {
    // Metodo per aggiornare le categorie
    async updateData(indexCategory, updatedValues, indexService) {
        try {
            // Costruisci il payload del corpo della richiesta
            const payload = {
                index: indexCategory,
                updatedTableData: updatedValues
            };

            // Se indexService è fornito, aggiungilo al payload
            if (typeof indexService !== 'undefined') {
                payload.indexService = indexService;
            }
            console.log('updateTable', updatedValues)

            // Esegui la richiesta PUT
            const response = await axios.put(API_URL_DATE_PutDataFVH, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status !== 200) {
                throw new Error('Errore durante l\'aggiornamento del valore');
            }

            console.log('Update successful:', response.data);
            return response.data; // Restituisci la risposta del server se necessario

        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
            throw error; // Rilancia l'errore per gestirlo nel componente chiamante
        }
    }
}

export default new putDataFVH();
