# Usa un'immagine base con Node.js
FROM node:14-alpine as build

# Imposta la directory di lavoro nel contenitore
WORKDIR /app

# Copia i file di dipendenza
COPY package.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY . .

RUN npm run build

FROM nginx:alpine 
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]