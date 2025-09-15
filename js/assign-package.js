document.addEventListener("DOMContentLoaded", async () => {
  const memberSelect = document.getElementById("memberSelect");

  // Fetch members for dropdown
  const snapshot = await db.collection("members").get();
  snapshot.forEach(doc => {
    const member = doc.data();
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = member.fullName + ` (${member.package || "No Package"})`;
    memberSelect.appendChild(option);
  });

  // Handle form submission
  document.getElementById("assignPackageForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const memberId = memberSelect.value;
    const newPackage = document.getElementById("packageSelect").value;

    try {
      await db.collection("members").doc(memberId).update({
        package: newPackage
      });
      alert("Package assigned successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error assigning package:", error);
      alert("Failed to assign package. Check console.");
    }
  });
});
