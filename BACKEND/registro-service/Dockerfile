FROM node:20-alpine
WORKDIR /usr/src/app/BACKEND/registro-service
COPY BACKEND/registro-service/package*.json ./
RUN npm install
COPY BACKEND/registro-service ./
COPY lib /usr/src/app/lib
EXPOSE 3001
CMD ["npm", "start"]
