document.addEventListener("DOMContentLoaded", async () => {
  const memberSelect = document.getElementById("memberSelect");
  const packageInput = document.getElementById("package");

  // Fetch members for dropdown
  const snapshot = await db.collection("members").get();
  snapshot.forEach(doc => {
    const member = doc.data();
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = member.fullName;
    option.dataset.package = member.package;
    memberSelect.appendChild(option);
  });

  // Auto-fill package when member is selected
  memberSelect.addEventListener("change", () => {
    const selectedOption = memberSelect.options[memberSelect.selectedIndex];
    packageInput.value = selectedOption.dataset.package || "";
  });

  // Handle form submission
  document.getElementById("createBillForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const memberId = memberSelect.value;
    const memberName = memberSelect.options[memberSelect.selectedIndex].text;
    const packageName = packageInput.value;
    const amount = parseFloat(document.getElementById("amount").value);
    const dueDate = document.getElementById("dueDate").value;

    try {
      await db.collection("bills").add({
        memberId,
        memberName,
        package: packageName,
        amount,
        dueDate,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Bill created successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error creating bill:", error);
      alert("Failed to create bill. Check console.");
    }
  });
});
