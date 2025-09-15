document.addEventListener("DOMContentLoaded", async () => {
  const memberSelect = document.getElementById("memberSelect");

  // Fetch members from Firestore
  const snapshot = await db.collection("members").get();
  snapshot.forEach(doc => {
    const member = doc.data();
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = member.fullName;
    memberSelect.appendChild(option);
  });

  // Handle form submission
  document.getElementById("assignNotificationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const memberId = memberSelect.value;
    const title = document.getElementById("title").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      if (memberId === "all") {
        // Send to all members
        const membersSnapshot = await db.collection("members").get();
        const batch = db.batch();

        membersSnapshot.forEach(memberDoc => {
          const notifRef = db.collection("notifications").doc();
          batch.set(notifRef, {
            memberId: memberDoc.id,
            title,
            message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });

        await batch.commit();
      } else {
        // Send to specific member
        await db.collection("notifications").add({
          memberId,
          title,
          message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      alert("Notification assigned successfully!");
      document.getElementById("assignNotificationForm").reset();

    } catch (error) {
      console.error("Error assigning notification: ", error);
      alert("Failed to assign notification. Check console.");
    }
  });
});
