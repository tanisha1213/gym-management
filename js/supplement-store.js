document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addSupplementForm");
  const tableBody = document.getElementById("supplementTableBody");

  // Add supplement
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("suppName").value.trim();
    const price = document.getElementById("price").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const stock = document.getElementById("stock").value.trim();

    try {
      await db.collection("supplements").add({
        name,
        price,
        weight,
        stock
      });
      alert("Supplement added!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error adding supplement.");
    }
  });

  // Fetch supplements
  db.collection("supplements").onSnapshot(snapshot => {
    tableBody.innerHTML = "";
    snapshot.forEach(doc => {
      const s = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${s.name}</td>
        <td>${s.price}</td>
        <td>${s.weight}</td>
        <td>${s.stock}</td>
        <td>
          <button class="edit-btn" onclick="editSupplement('${doc.id}', '${s.name}', '${s.price}', '${s.weight}', '${s.stock}')">Edit</button>
          <button class="delete-btn" onclick="deleteSupplement('${doc.id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  });
});

// Edit Supplement
function editSupplement(id, name, price, weight, stock) {
  const newName = prompt("Enter new name:", name);
  if (newName === null) return;
  const newPrice = prompt("Enter new price:", price);
  if (newPrice === null) return;
  const newWeight = prompt("Enter new weight:", weight);
  if (newWeight === null) return;
  const newStock = prompt("Enter new stock:", stock);
  if (newStock === null) return;

  db.collection("supplements").doc(id).update({
    name: newName,
    price: newPrice,
    weight: newWeight,
    stock: newStock
  }).then(() => alert("Updated successfully!"))
    .catch(err => alert("Error updating supplement."));
}

// Delete Supplement
function deleteSupplement(id) {
  if (confirm("Delete this supplement?")) {
    db.collection("supplements").doc(id).delete()
      .then(() => alert("Deleted successfully!"))
      .catch(err => alert("Error deleting supplement."));
  }
}
