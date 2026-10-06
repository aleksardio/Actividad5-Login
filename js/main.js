class DatePicker {
  constructor(config) {
    this.input = document.getElementById(config.inputId);
    this.btnToggle = document.getElementById(config.btnToggleId);
    this.dropdown = document.getElementById(config.dropdownId);
    this.daysContainer = document.getElementById(config.daysContainerId);
    this.selectMonth = document.getElementById(config.selectMonthId);
    this.selectYear = document.getElementById(config.selectYearId);
    this.btnPrev = document.getElementById(config.prevBtnId);
    this.btnNext = document.getElementById(config.nextBtnId);
    this.btnToday = document.getElementById(config.todayBtnId);
    this.btnClear = document.getElementById(config.clearBtnId);

    this.currentDate = new Date();
    this.selectedDate = null;
    this.minYear = config.minYear || 1950;
    this.maxYear = config.maxYear || new Date().getFullYear();

    this.init();
  }

  init() {
    this.populateSelects();
    this.bindEvents();
    this.render();
  }

  populateSelects() {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    months.forEach((m, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = m;
      this.selectMonth.appendChild(opt);
    });

    for (let y = this.maxYear; y >= this.minYear; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      this.selectYear.appendChild(opt);
    }
  }

  bindEvents() {
    const toggle = (e) => {
      e.stopPropagation();
      this.dropdown.classList.toggle('active');
    };

    this.btnToggle.addEventListener('click', toggle);
    this.input.addEventListener('click', toggle);

    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target) && e.target !== this.input && e.target !== this.btnToggle) {
        this.dropdown.classList.remove('active');
      }
    });

    this.btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });

    this.btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });

    this.selectMonth.addEventListener('change', () => {
      this.currentDate.setMonth(parseInt(this.selectMonth.value, 10));
      this.render();
    });

    this.selectYear.addEventListener('change', () => {
      this.currentDate.setFullYear(parseInt(this.selectYear.value, 10));
      this.render();
    });

    this.btnToday.addEventListener('click', (e) => {
      e.stopPropagation();
      const now = new Date();
      this.selectDate(now.getFullYear(), now.getMonth(), now.getDate());
    });

    this.btnClear.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectedDate = null;
      this.input.value = '';
      this.dropdown.classList.remove('active');
      this.render();
    });
  }

  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.selectMonth.value = month;
    this.selectYear.value = year;

    this.daysContainer.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Celdas vacías previas
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'datepicker-day empty';
      this.daysContainer.appendChild(emptyCell);
    }

    // Días del mes
    for (let d = 1; d <= totalDays; d++) {
      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = 'datepicker-day';
      dayBtn.textContent = d;

      if (
        this.selectedDate &&
        this.selectedDate.getFullYear() === year &&
        this.selectedDate.getMonth() === month &&
        this.selectedDate.getDate() === d
      ) {
        dayBtn.classList.add('selected');
      }

      dayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectDate(year, month, d);
      });

      this.daysContainer.appendChild(dayBtn);
    }
  }

  selectDate(year, month, day) {
    this.selectedDate = new Date(year, month, day);
    this.currentDate = new Date(year, month, day);

    const formatMonth = String(month + 1).padStart(2, '0');
    const formatDay = String(day).padStart(2, '0');
    this.input.value = `${year}-${formatMonth}-${formatDay}`;

    this.input.classList.remove('is-invalid');
    this.input.classList.add('is-valid');
    this.dropdown.classList.remove('active');
    this.render();
  }
}

// ==========================================
// FLUJO Y EVENTOS DEL DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  // 1. Alternar Sidebar con Botón Hamburguesa
  const sidebar = document.getElementById('sidebar');
  const sidebarBtn = document.getElementById('sidebarCollapse');

  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // 2. Validación de Captura de Usuarios usando utileria.js
  const formUsuario = document.getElementById('formUsuario');
  formUsuario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreUser');
    const correo = document.getElementById('correoUser');
    const pass = document.getElementById('passUser');
    const msg = document.getElementById('msgUsuario');

    const esNombreValido = soloLetras(nombre.value.trim());
    const esCorreoValido = validarCorreo(correo.value.trim());
    const esPassValida = validarPassword(pass.value.trim());

    nombre.classList.toggle('is-invalid', !esNombreValido);
    nombre.classList.toggle('is-valid', esNombreValido);

    correo.classList.toggle('is-invalid', !esCorreoValido);
    correo.classList.toggle('is-valid', esCorreoValido);

    pass.classList.toggle('is-invalid', !esPassValida);
    pass.classList.toggle('is-valid', esPassValida);

    if (esNombreValido && esCorreoValido && esPassValida) {
      msg.classList.remove('d-none');
      formUsuario.reset();
      setTimeout(() => msg.classList.add('d-none'), 3500);
    }
  });

  // 3. Inicializar DatePicker para Alumnos
  new DatePicker({
    inputId: 'fechaNacAlumno',
    btnToggleId: 'btnToggleCalendar',
    dropdownId: 'datepickerDropdown',
    daysContainerId: 'datepickerDays',
    selectMonthId: 'selectMonth',
    selectYearId: 'selectYear',
    prevBtnId: 'prevMonth',
    nextBtnId: 'nextMonth',
    todayBtnId: 'btnToday',
    clearBtnId: 'btnClearDate',
    minYear: 1980,
    maxYear: new Date().getFullYear()
  });

  // 4. Formulario de Alumnos y Modal de Edad
  const formAlumno = document.getElementById('formAlumno');
  const numControlInput = document.getElementById('numControl');
  const fechaNacInput = document.getElementById('fechaNacAlumno');
  const modalEdad = new bootstrap.Modal(document.getElementById('modalEdad'));

  // Permitir sólo dígitos
  numControlInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
  });

  formAlumno.addEventListener('submit', (e) => {
    e.preventDefault();

    const numCtrl = numControlInput.value.trim();
    const fechaNac = fechaNacInput.value.trim();

    // Validaciones con funciones de utileria.js
    const esControlValido = /^\d+$/.test(numCtrl) && validarLongitud(numCtrl, 6);
    const esFechaValida = fechaNac !== '';

    numControlInput.classList.toggle('is-invalid', !esControlValido);
    numControlInput.classList.toggle('is-valid', esControlValido);

    fechaNacInput.classList.toggle('is-invalid', !esFechaValida);
    fechaNacInput.classList.toggle('is-valid', esFechaValida);

    if (esControlValido && esFechaValida) {
      const esMayor = esMayorDeEdad(fechaNac);
      const edadCalculada = calcularEdad(fechaNac);

      const modalContenido = document.getElementById('modalEdadContenido');
      modalContenido.innerHTML = `
        <div class="mb-3">
          <i class="fa-solid ${esMayor ? 'fa-circle-check text-success' : 'fa-circle-info text-warning'} fa-4x"></i>
        </div>
        <h4>No. de Control: <strong>${numCtrl}</strong></h4>
        <p class="fs-5 mb-2">Edad calculada: <strong>${edadCalculada} años</strong></p>
        <span class="badge ${esMayor ? 'bg-success' : 'bg-warning text-dark'} fs-6">
          ${esMayor ? 'Mayor de edad' : 'Menor de edad'}
        </span>
      `;

      modalEdad.show();
    }
  });

});