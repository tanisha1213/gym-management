document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addMemberForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const joiningDate = document.getElementById("joiningDate").value;
    const feePackage = document.getElementById("package").value;

    try {
      await db.collection("members").add({
        fullName,
        email,
        phone,
        joiningDate,
        package: feePackage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Member added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error adding member: ", error);
      alert("Failed to add member. Check console.");
    }
  });
});
