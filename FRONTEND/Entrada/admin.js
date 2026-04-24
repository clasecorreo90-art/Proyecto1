const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000';

const profesorForm = document.getElementById('profesor-form');
const materiaForm = document.getElementById('materia-form');
const profesorNombreInput = document.getElementById('profesor-nombre');
const profesorDepartamentoInput = document.getElementById('profesor-departamento');
const materiaNombreInput = document.getElementById('materia-nombre');
const materiaProfesorSelect = document.getElementById('materia-profesor');
const profesorStatus = document.getElementById('profesor-status');
const materiaStatus = document.getElementById('materia-status');

function setStatus(element, message, ok) {
  element.textContent = message;
  element.style.color = ok ? '#0b8043' : '#d93025';
}

async function cargarProfesores() {
  try {
    const response = await fetch(`${API_BASE_URL}/profesores`);
    if (!response.ok) {
      throw new Error('No se pudieron cargar los profesores');
    }

    const profesores = await response.json();
    materiaProfesorSelect.innerHTML = '<option value="">Seleccione un profesor</option>';

    profesores.forEach((profesor) => {
      const option = document.createElement('option');
      option.value = profesor.id;
      option.textContent = `${profesor.nombre} (${profesor.departamento})`;
      materiaProfesorSelect.appendChild(option);
    });
  } catch (error) {
    setStatus(materiaStatus, error.message, false);
  }
}

profesorForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    nombre: profesorNombreInput.value.trim(),
    departamento: profesorDepartamentoInput.value.trim()
  };

  try {
    const response = await fetch(`${API_BASE_URL}/profesores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(profesorStatus, data.error || 'No se pudo crear el profesor', false);
      return;
    }

    setStatus(profesorStatus, `Profesor creado: ${data.nombre}`, true);
    profesorForm.reset();
    await cargarProfesores();
  } catch (error) {
    setStatus(profesorStatus, 'Error al crear el profesor', false);
  }
});

materiaForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    nombre: materiaNombreInput.value.trim(),
    profesorId: Number(materiaProfesorSelect.value)
  };

  try {
    const response = await fetch(`${API_BASE_URL}/materias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(materiaStatus, data.error || 'No se pudo crear la materia', false);
      return;
    }

    setStatus(materiaStatus, `Materia creada: ${data.nombre}`, true);
    materiaForm.reset();
  } catch (error) {
    setStatus(materiaStatus, 'Error al crear la materia', false);
  }
});

window.addEventListener('DOMContentLoaded', cargarProfesores);

