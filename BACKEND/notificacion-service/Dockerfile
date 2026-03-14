FROM node:20-alpine
WORKDIR /usr/src/app/BACKEND/notificacion-service
COPY BACKEND/notificacion-service/package*.json ./
RUN npm install
COPY BACKEND/notificacion-service ./
COPY lib /usr/src/app/lib
EXPOSE 3003
CMD ["npm", "start"]
