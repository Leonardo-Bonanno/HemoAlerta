document.addEventListener("DOMContentLoaded", () => {
  const btnEnvio = document.getElementById("btn-envio");
  const btnHistory = document.getElementById("btn-history");
  const form = document.getElementById("formulario");

  const modalElementConfirm = document.getElementById("modal-confirm");
  const modalConfirm = new bootstrap.Modal(modalElementConfirm);
  const btnConfirmAlert = document.getElementById("confirm-alert");

  const modalElementHistory = document.getElementById("modal-history");
  const modalHistory = new bootstrap.Modal(modalElementHistory);

  loadLocations();

  // Dados mocados
  const alertsHistory = [
    { data: "2026-01-20", local: "Clínica Cruzeiro do Sul", tipo: "O+" },
    { data: "2026-01-21", local: "Hospital São Paulo", tipo: "A-" },
    { data: "2026-01-22", local: "UPA Zona Sul", tipo: "AB+" },
  ];

  // botão de envio
  btnEnvio.addEventListener("click", () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    modalConfirm.show();
  });

  // botão modal
  btnConfirmAlert.addEventListener("click", async () => {
    const hemocentro = form.hemocentro.value;
    const sanguineo = form.sanguineo.value;

    const response = await fetch("http://localhost:3000/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hemocentro,
        sanguineo,
      }),
    });

    const data = await response.json();

    console.log("Resposta do backend:", data);

    alert(data.message);

    modalConfirm.hide();
    form.reset();
  });

  // botão de histórico
  btnHistory.addEventListener("click", () => {
    loadTabelAlerts();
    modalHistory.show();
  });
});

async function loadTabelAlerts() {
  const tbody = document.getElementById("tabel-alerts");

  try {
    const response = await fetch("http://localhost:3000/alerts");

    if (!response.ok) {
      throw new Error("Erro ao buscar alertas");
    }

    const alerts = await response.json();

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

    alerts.forEach((alert) => {
      const tr = document.createElement("tr");

      const tdData = document.createElement("td");
      tdData.textContent = new Date(alert.data).toLocaleString("pt-BR");

      const tdLocal = document.createElement("td");
      tdLocal.textContent = alert.hemocentro;

      const tdTipo = document.createElement("td");
      tdTipo.textContent = alert.sanguineo;

      tr.append(tdData, tdLocal, tdTipo);
      fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
  } catch (error) {
    console.error("Erro ao carregar alertas:", error);
  }
}

async function loadLocations() {
  try {
    const selectLocal = document.getElementById('hemocentro');

    const response = await fetch("http://localhost:3000/alerts/locals");

    const locals = await response.json();

    const fragment = document.createDocumentFragment();

    locals.forEach((local) => {
      const location = document.createElement("option");
      location.value = local.id;
      location.textContent = local.name;

      fragment.appendChild(location);
    });

    selectLocal.appendChild(fragment);

  } catch (error) {
    console.error("Erro ao carregar locais:", error);
  }
}
