FROM node:20-alpine
WORKDIR /usr/src/app/BACKEND/consulta-service
COPY BACKEND/consulta-service/package*.json ./
RUN npm install
COPY BACKEND/consulta-service ./
COPY lib /usr/src/app/lib
EXPOSE 3002
CMD ["npm", "start"]
