document.addEventListener("DOMContentLoaded", () => {
  const notificationsList = document.getElementById("notificationsList");

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "../login.html";
      return;
    }

    // Assuming notifications collection has a "memberEmail" field
    db.collection("notifications")
      .where("memberEmail", "==", user.email)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        notificationsList.innerHTML = ""; // Clear before loading
        if (snapshot.empty) {
          notificationsList.innerHTML = `<li>No notifications found.</li>`;
          return;
        }

        snapshot.forEach((doc) => {
          const note = doc.data();
          notificationsList.innerHTML += `
            <li>
              <strong>${note.title || "Notification"}</strong><br>
              ${note.message || ""} <br>
              <small>${note.date || ""}</small>
            </li>
          `;
        });
      });
  });
});
