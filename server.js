const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let leads = []; // Temporary storage (no DB for simplicity)

// CREATE lead
app.post("/add-lead", (req, res) => {
  const lead = { id: Date.now(), ...req.body };
  leads.push(lead);
  res.json({ message: "Lead added", lead });
});

// READ all leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

// UPDATE lead status
app.put("/update-lead/:id", (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  leads = leads.map((lead) =>
    lead.id == id ? { ...lead, status, notes } : lead
  );

  res.json({ message: "Lead updated" });
});

// DELETE lead
app.delete("/delete-lead/:id", (req, res) => {
  const { id } = req.params;
  leads = leads.filter((lead) => lead.id != id);
  res.json({ message: "Lead deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});