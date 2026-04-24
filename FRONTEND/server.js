const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const publicPath = path.join(__dirname, 'Presentacion');

function sendHtml(res, filename) {
  const fullPath = path.join(publicPath, filename);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(fullPath);
}

app.get('/', (req, res) => sendHtml(res, 'index.html'));
app.get('/registro.html', (req, res) => sendHtml(res, 'registro.html'));
app.get('/consulta.html', (req, res) => sendHtml(res, 'consulta.html'));
app.get('/notificaciones.html', (req, res) => sendHtml(res, 'notificaciones.html'));
app.get('/gestion.html', (req, res) => sendHtml(res, 'gestion.html'));

app.use('/entrada', express.static(path.join(__dirname, 'Entrada')));
app.use(express.static(publicPath));

app.get('/config.js', (req, res) => {
  const gatewayUrl = process.env.GATEWAY_URL || 'http://gateway:3000';
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.send(`window.API_BASE_URL = '${gatewayUrl}';`);
});

app.use((req, res) => res.redirect('/'));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
