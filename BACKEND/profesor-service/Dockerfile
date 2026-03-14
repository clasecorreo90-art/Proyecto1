FROM node:20-alpine
WORKDIR /usr/src/app/BACKEND/profesor-service
COPY BACKEND/profesor-service/package*.json ./
RUN npm install
COPY BACKEND/profesor-service ./
COPY lib /usr/src/app/lib
EXPOSE 3004
CMD ["npm", "start"]
