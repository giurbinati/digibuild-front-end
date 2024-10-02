import axios from 'axios';

const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_DATE_DataIasiSitta = config.host + "/categoriesiasisitta";

class GetDataIasiSitta {
    // Metodo per fetchare le categorie
    async fetchBuildingData(building, indexCategory, indexService) {
        try {
            const response = await axios.get(API_URL_DATE_DataIasiSitta);

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            const categories = response.data[0].categories;

            let buildingData;

            // Se indexService è definito, accedi a categories[indexCategory].services[indexService].nameBuilding
            if (typeof indexService !== 'undefined') {
                console.log(categories[indexCategory].services[indexService])
                buildingData = categories[indexCategory]
                    .services[indexService]
                    .nameBuilding
                    .find(b => b.buildingName === building);
            }
            // Se indexService non è definito, accedi solo a categories[indexCategory].nameBuilding
            else {
                console.log(categories[indexCategory])
                buildingData = categories[indexCategory]
                    .nameBuilding
                    .find(b => b.buildingName === building);
            }

            if (!buildingData) {
                throw new Error(`Nessun dato trovato per l'edificio: ${building}`);
            }

            // Restituisci i dati corretti in base alla presenza di indexService
            return buildingData.tableData;

        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}

export default new GetDataIasiSitta();
