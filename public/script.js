const API = "http://localhost:5000";

// Load leads
async function loadLeads() {
  const res = await fetch(`${API}/leads`);
  const data = await res.json();

  const table = document.getElementById("leadTable");
  table.innerHTML = "";

  data.forEach(lead => {
    table.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.source}</td>
        <td>
          <select onchange="updateLead(${lead.id}, this.value)">
            <option ${lead.status === "new" ? "selected" : ""}>new</option>
            <option ${lead.status === "contacted" ? "selected" : ""}>contacted</option>
            <option ${lead.status === "converted" ? "selected" : ""}>converted</option>
          </select>
        </td>
        <td>
          <input value="${lead.notes || ""}" onchange="updateNotes(${lead.id}, this.value)">
        </td>
        <td>
          <button onclick="deleteLead(${lead.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add lead
async function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const source = document.getElementById("source").value;

  await fetch(`${API}/add-lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, source, status: "new" })
  });

  loadLeads();
}

// Update status
async function updateLead(id, status) {
  await fetch(`${API}/update-lead/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  loadLeads();
}

// Update notes
async function updateNotes(id, notes) {
  await fetch(`${API}/update-lead/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notes })
  });
}

// Delete lead
async function deleteLead(id) {
  await fetch(`${API}/delete-lead/${id}`, {
    method: "DELETE"
  });

  loadLeads();
}

// Load on start
loadLeads();
