// Mock pharmacy data
const pharmacies = [
  {
    name: "City Medico",
    lat: 28.4595,
    lon: 77.0266,
    medicines: ["Paracetamol", "Ibuprofen", "Amoxicillin"]
  },
  {
    name: "Health Plus",
    lat: 28.4601,
    lon: 77.0300,
    medicines: ["Cetirizine", "Paracetamol", "Aspirin"]
  },
  {
    name: "MediCare Point",
    lat: 28.4570,
    lon: 77.0320,
    medicines: ["Ibuprofen", "Metformin", "Paracetamol"]
  }
];

// Calculate distance using Haversine Formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Main function to find nearby pharmacies
function searchMedicine() {
  const query = document.getElementById("medicineInput").value.trim().toLowerCase();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<p>Searching...</p>";

  if (!navigator.geolocation) {
    resultsContainer.innerHTML = "<p>Geolocation is not supported by your browser.</p>";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      const found = pharmacies
        .map(pharmacy => {
          const hasMedicine = pharmacy.medicines.some(
            med => med.toLowerCase() === query
          );
          const distance = getDistance(userLat, userLon, pharmacy.lat, pharmacy.lon);
          return hasMedicine ? { ...pharmacy, distance } : null;
        })
        .filter(pharmacy => pharmacy !== null)
        .sort((a, b) => a.distance - b.distance);

      if (found.length === 0) {
        resultsContainer.innerHTML = "<p>No nearby pharmacies found with that medicine.</p>";
        return;
      }

      resultsContainer.innerHTML = "<h3>Nearby Pharmacies:</h3>";
      found.forEach(pharmacy => {
        resultsContainer.innerHTML += `
          <div>
            <strong>${pharmacy.name}</strong><br/>
            Distance: ${pharmacy.distance.toFixed(2)} km<br/>
            Available Medicines: ${pharmacy.medicines.join(", ")}
            <hr/>
          </div>
        `;
      });
    },
    (error) => {
      resultsContainer.innerHTML = `<p>Error getting location: ${error.message}</p>`;
    }
  );
}
