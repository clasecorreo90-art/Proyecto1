const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000';
const bloqueConsulta = document.getElementById('bloque-consulta');
const consultaBody = document.getElementById('salones-body');
const consultaButton = document.getElementById('consulta-refresh');

async function cargarConsulta() {
  const bloque = bloqueConsulta.value;
  const params = bloque ? `?bloque=${bloque}` : '';
  try {
    const response = await fetch(`${API_BASE_URL}/salones${params}`);
    if (!response.ok) throw new Error('Fallo la consulta de salones');
    const salones = await response.json();
    consultaBody.innerHTML = '';
    salones.forEach((salon) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${salon.salon}</td>
        <td class="estado-${salon.estado}">${salon.estado}</td>
        <td>${salon.profesor || '—'}</td>
        <td>${salon.bloques?.join(', ') || '—'}</td>
      `;
      consultaBody.appendChild(row);
    });
  } catch (error) {
    consultaBody.innerHTML = `<tr><td colspan="4">${error.message}</td></tr>`;
  }
}

consultaButton.addEventListener('click', cargarConsulta);
window.addEventListener('DOMContentLoaded', cargarConsulta);
