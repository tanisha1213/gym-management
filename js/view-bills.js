document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("billsTableBody");

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "../login.html";
      return;
    }

    // Assuming bills collection has a "memberEmail" field
    db.collection("bills")
      .where("memberEmail", "==", user.email)
      .onSnapshot((snapshot) => {
        tableBody.innerHTML = ""; // Clear before loading
        if (snapshot.empty) {
          tableBody.innerHTML = `<tr><td colspan="4">No bills found.</td></tr>`;
          return;
        }

        snapshot.forEach((doc) => {
          const bill = doc.data();
          const row = `
            <tr>
              <td>${bill.billDate || "-"}</td>
              <td>${bill.amount || "-"}</td>
              <td>${bill.package || "-"}</td>
              <td>${bill.status || "Unpaid"}</td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });
      });
  });
});
