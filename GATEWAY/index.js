const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const registroClient = axios.create({ baseURL: process.env.REGISTRO_SERVICE_URL });
const consultaClient = axios.create({ baseURL: process.env.CONSULTA_SERVICE_URL });
const notificacionClient = axios.create({ baseURL: process.env.NOTIFICACION_SERVICE_URL });
const profesorClient = axios.create({ baseURL: process.env.PROFESOR_SERVICE_URL });

app.post('/registro', async (req, res) => {
  try {
    const response = await registroClient.post('/registro', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: error.response?.data || error.message });
  }
});

app.get('/salones', async (req, res) => {
  try {
    const response = await consultaClient.get('/salones', { params: req.query });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/notificaciones', async (req, res) => {
  try {
    const response = await notificacionClient.get('/notificaciones');
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/profesores', async (req, res) => {
  try {
    const response = await profesorClient.get('/profesores');
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/profesor/:id', async (req, res) => {
  try {
    const response = await profesorClient.get(`/profesor/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/profesor/:id/clases', async (req, res) => {
  try {
    const response = await profesorClient.get(`/profesor/${req.params.id}/clases`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
