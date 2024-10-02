import axios from 'axios';

const config = {
    host: process.env.REACT_APP_API_HOST,
};

const API_URL_DATE_PutDataIasiSitta = config.host + "/putcategoriesiasisitta";

class UpdateBuildingDataService {
    // Metodo per aggiornare i dati del building
    async updateBuildingData(buildingName, indexCategory, updatedValues, indexService) {
        try {
            // Costruisci il payload della richiesta
            const payload = {
                buildingName, // Nome del building selezionato
                index: indexCategory, // Indice della categoria
                updatedTableData: updatedValues // Dati aggiornati della tabella
            };

            // Se indexService è presente, aggiungilo al payload
            if (typeof indexService !== 'undefined') {
                payload.indexService = indexService;
            }

            // Esegui la richiesta PUT
            const response = await axios.put(API_URL_DATE_PutDataIasiSitta, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status !== 200) {
                throw new Error('Errore durante l\'aggiornamento del valore');
            }

            console.log('Update successful:', response.data);
            return response.data; // Restituisci la risposta se necessario

        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
            throw error; // Rilancia l'errore per la gestione nel componente
        }
    }
}

export default new UpdateBuildingDataService();
