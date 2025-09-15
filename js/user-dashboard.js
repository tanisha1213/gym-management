document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "../login.html";
    }
  });

  // Logout / Back button
  document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "../select-role.html";
  });

  // Show Gym Details
  document.getElementById("viewDetailsBtn").addEventListener("click", () => {
    document.getElementById("gymDetailsSection").classList.remove("hidden");
    document.getElementById("searchRecordsSection").classList.add("hidden");
  });

  // Show Search Records
  document.getElementById("searchRecordsBtn").addEventListener("click", () => {
    document.getElementById("searchRecordsSection").classList.remove("hidden");
    document.getElementById("gymDetailsSection").classList.add("hidden");
    loadAllMembers();
  });

  // Load Members
  function loadAllMembers() {
    const tableBody = document.getElementById("membersTableBody");
    tableBody.innerHTML = "";

    db.collection("members").orderBy("fullName").get().then(snapshot => {
      snapshot.forEach(doc => {
        const m = doc.data();
        const row = `
          <tr>
            <td>${m.fullName}</td>
            <td>${m.email}</td>
            <td>${m.phone}</td>
            <td>${m.joiningDate}</td>
            <td>${m.package}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    });
  }

  // Search Filter
  document.getElementById("searchInput").addEventListener("input", function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll("#membersTableBody tr");
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
    });
  });
});
