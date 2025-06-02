const medicines = [
  { name: "Paracetamol", location: "Pharmacy A" },
  { name: "Ibuprofen", location: "Pharmacy B" },
  { name: "Amoxicillin", location: "Pharmacy C" },
  { name: "Cetirizine", location: "Pharmacy D" },
  { name: "Azithromycin", location: "Pharmacy E" }
];

function searchMedicine() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results

  const found = medicines.filter(med =>
    med.name.toLowerCase().includes(query)
  );

  if (found.length > 0) {
    found.forEach(med => {
      const card = document.createElement("div");
      card.className = "medicine";
      card.innerHTML = `<strong>${med.name}</strong> is available at <em>${med.location}</em>`;
      resultDiv.appendChild(card);
    });
  } else {
    resultDiv.innerHTML = "<p>No nearby pharmacy found with that medicine.</p>";
  }
}
