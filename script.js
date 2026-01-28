document.addEventListener('DOMContentLoaded', () => {
  const btnEnvio = document.getElementById('btn-envio');
  const btnHistory = document.getElementById('btn-history')
  const form = document.getElementById('formulario');

  const modalElementConfirm = document.getElementById('modal-confirm');
  const modalConfirm = new bootstrap.Modal(modalElementConfirm); // inicializa o modal
  const btnConfirmAlert = document.getElementById('confirm-alert');

  const modalElementHistory = document.getElementById('modal-history');
  const modalHistory = new bootstrap.Modal(modalElementHistory);

  // Dados mocados
  const alertsHistory = [
  { data: "2026-01-20", local: "Clínica Cruzeiro do Sul", tipo: "O+" },
  { data: "2026-01-21", local: "Hospital São Paulo", tipo: "A-" },
  { data: "2026-01-22", local: "UPA Zona Sul", tipo: "AB+" }
];


  // botão de envio
  btnEnvio.addEventListener('click', () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    modalConfirm.show();
  });

  // botão modal
  btnConfirmAlert.addEventListener('click', async () => {
    // chamada para backend
    console.log("Alerta confirmado!");

    modalConfirm.hide();
    form.reset();
  });

  // botão de histórico
  btnHistory.addEventListener('click', () =>{
    modalHistory.show();
  })

  loadTabelAlerts(alertsHistory);
});

function loadTabelAlerts(alerts) {
  const tbody = document.getElementById("tabel-alerts");

  tbody.textContent = "";

  if (alerts.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    td.colSpan = 3;
    td.textContent = "Nenhum alerta registrado";

    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  const fragment = document.createDocumentFragment();

  alerts.forEach(alert => {
    const tr = document.createElement("tr");

    const tdData = document.createElement("td");
    tdData.textContent = alert.data;

    const tdLocal = document.createElement("td");
    tdLocal.textContent = alert.local;

    const tdTipo = document.createElement("td");
    tdTipo.textContent = alert.tipo;

    tr.append(tdData, tdLocal, tdTipo);
    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);
}