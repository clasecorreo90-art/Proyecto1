FROM node:20-alpine
WORKDIR /usr/src/app/GATEWAY
COPY GATEWAY/package*.json ./
RUN npm install
COPY GATEWAY ./
COPY lib /usr/src/app/lib
EXPOSE 3000
CMD ["npm", "start"]
