const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000';
const alertasButton = document.getElementById('alertas-refresh');
const alertasList = document.getElementById('alertas-list');

async function cargarAlertas() {
  try {
    const response = await fetch(`${API_BASE_URL}/notificaciones`);
    if (!response.ok) throw new Error('No se pudieron obtener las alertas');
    const data = await response.json();
    alertasList.innerHTML = '';

    if (!data.ausencias.length) {
      alertasList.innerHTML = '<li>No hay alertas por ahora</li>';
      return;
    }

    data.ausencias.forEach((alerta) => {
      const item = document.createElement('li');
      item.textContent = `Profesor ${alerta.profesor || alerta.profesorId} con clase ${alerta.clase} en bloques ${alerta.bloques.join(', ')}.`;
      alertasList.appendChild(item);
    });
  } catch (error) {
    alertasList.innerHTML = `<li>${error.message}</li>`;
  }
}

alertasButton.addEventListener('click', cargarAlertas);
window.addEventListener('DOMContentLoaded', cargarAlertas);
