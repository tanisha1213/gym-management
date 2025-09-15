document.addEventListener("DOMContentLoaded", () => {
  const membersTableBody = document.getElementById("membersTableBody");
  const editModal = document.getElementById("editModal");
  const closeModalBtn = document.querySelector(".close");
  const editMemberForm = document.getElementById("editMemberForm");

  let currentMemberId = null;

  // Fetch members and display in table
  db.collection("members").onSnapshot(snapshot => {
    membersTableBody.innerHTML = "";
    snapshot.forEach(doc => {
      const m = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${m.fullName || ""}</td>
        <td>${m.email || ""}</td>
        <td>${m.phone || ""}</td>
        <td>${m.joiningDate || ""}</td>
        <td>${m.package || ""}</td>
        <td>
          <button class="edit-btn" onclick="editMember('${doc.id}')">Edit</button>
          <button class="delete-btn" onclick="deleteMember('${doc.id}')">Delete</button>
          <button class="diet-btn" onclick="assignDiet('${doc.id}')">Diet Plan</button>
        </td>
      `;
      membersTableBody.appendChild(row);
    });
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Save edited member
  editMemberForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedData = {
      fullName: document.getElementById("editName").value.trim(),
      email: document.getElementById("editEmail").value.trim(),
      phone: document.getElementById("editPhone").value.trim(),
      joiningDate: document.getElementById("editJoiningDate").value.trim(),
      package: document.getElementById("editPackage").value.trim()
    };

    db.collection("members").doc(currentMemberId).update(updatedData)
      .then(() => {
        alert("Member updated successfully!");
        editModal.style.display = "none";
      })
      .catch(err => {
        console.error("Error updating member:", err);
        alert("Failed to update member. Check console.");
      });
  });

  // Delete member function
  window.deleteMember = function (id) {
    if (confirm("Are you sure you want to delete this member?")) {
      db.collection("members").doc(id).delete()
        .then(() => alert("Member deleted successfully!"))
        .catch(err => console.error("Error deleting member:", err));
    }
  };

  // Edit member function
  window.editMember = function (id) {
    currentMemberId = id;
    db.collection("members").doc(id).get()
      .then(doc => {
        if (doc.exists) {
          const m = doc.data();
          document.getElementById("editName").value = m.fullName || "";
          document.getElementById("editEmail").value = m.email || "";
          document.getElementById("editPhone").value = m.phone || "";
          document.getElementById("editJoiningDate").value = m.joiningDate || "";
          document.getElementById("editPackage").value = m.package || "";
          editModal.style.display = "block";
        }
      })
      .catch(err => console.error("Error fetching member:", err));
  };

  // Assign Diet Plan function
  window.assignDiet = function (memberId) {
    window.location.href = `diet-plan.html?id=${memberId}`;
  };
});
