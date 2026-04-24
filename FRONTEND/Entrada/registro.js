const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000';
const profesorSelect = document.getElementById('profesor-select');
const claseSelect = document.getElementById('clase-select');
const salonSelect = document.getElementById('salon-select');
const registroForm = document.getElementById('registro-form');
const bloquesInput = document.getElementById('bloques-input');
const registroStatus = document.getElementById('registro-status');

async function cargarProfesores() {
  try {
    const response = await fetch(`${API_BASE_URL}/profesores`);
    if (!response.ok) throw new Error('No se pudo cargar la lista de profesores');
    const profesores = await response.json();
    profesorSelect.innerHTML = '<option value="">Seleccione un profesor</option>';
    profesores.forEach((profesor) => {
      const option = document.createElement('option');
      option.value = profesor.id;
      option.textContent = `${profesor.nombre} (${profesor.departamento})`;
      profesorSelect.appendChild(option);
    });
  } catch (error) {
    registroStatus.textContent = error.message;
    registroStatus.style.color = '#d93025';
  }
}

async function cargarClases(profesorId) {
  claseSelect.innerHTML = '<option value="">Seleccione la clase</option>';
  if (!profesorId) return;
  try {
    const response = await fetch(`${API_BASE_URL}/profesor/${profesorId}/clases`);
    if (!response.ok) throw new Error('No se pudieron cargar las clases');
    const clases = await response.json();
    clases.forEach((clase) => {
      const option = document.createElement('option');
      option.value = clase.id;
      option.textContent = clase.nombre;
      claseSelect.appendChild(option);
    });
  } catch (error) {
    registroStatus.textContent = error.message;
    registroStatus.style.color = '#d93025';
  }
}

async function cargarSalones() {
  try {
    const response = await fetch(`${API_BASE_URL}/salones`);
    if (!response.ok) throw new Error('No se pudo cargar la lista de salones');

    const salones = await response.json();
    salonSelect.innerHTML = '<option value="">Seleccione un salón</option>';

    salones
      .map((item) => item.salon)
      .filter((salon, index, all) => salon && all.indexOf(salon) === index)
      .sort((a, b) => a.localeCompare(b, 'es'))
      .forEach((salon) => {
        const option = document.createElement('option');
        option.value = salon;
        option.textContent = salon;
        salonSelect.appendChild(option);
      });
  } catch (error) {
    registroStatus.textContent = error.message;
    registroStatus.style.color = '#d93025';
  }
}

registroForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = {
    profesorId: Number(profesorSelect.value),
    claseId: Number(claseSelect.value),
    salon: salonSelect.value,
    cantidadBloques: Number(bloquesInput.value)
  };

  if (!data.salon) {
    registroStatus.textContent = 'Seleccione un salón';
    registroStatus.style.color = '#d93025';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      registroStatus.textContent = error.error || 'No se pudo registrar el uso';
      registroStatus.style.color = '#d93025';
      return;
    }

    registroStatus.textContent = 'Registro guardado correctamente';
    registroStatus.style.color = '#0b8043';
    registroForm.reset();
    claseSelect.innerHTML = '<option value="">Seleccione la clase</option>';
  } catch (error) {
    registroStatus.textContent = 'Error al registrar';
    registroStatus.style.color = '#d93025';
  }
});

profesorSelect.addEventListener('change', () => {
  cargarClases(profesorSelect.value);
});

window.addEventListener('DOMContentLoaded', cargarProfesores);
window.addEventListener('DOMContentLoaded', cargarSalones);
