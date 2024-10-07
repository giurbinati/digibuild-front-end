const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_UPLOADFILE = config.host + "/upload";

class UploadFileFVH {

    // Method to handle GET requests with authorization
    async uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file); // Aggiunge il file a FormData

        try {
            const response = await fetch(API_URL_UPLOADFILE, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Errore durante l'upload del file");
            }

            const data = await response.json();
            console.log("Upload completato:", data);
            return data;
        } catch (error) {
            console.error("Errore durante l'upload del file:", error);
            throw error; // Puoi rilanciare l'errore per gestirlo esternamente
        }
    }
}

export default new UploadFileFVH();
