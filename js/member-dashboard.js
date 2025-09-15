document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "../login.html";
      return;
    }

    try {
      const memberDoc = await db.collection("members").doc(user.uid).get();
      if (memberDoc.exists) {
        const member = memberDoc.data();
        document.getElementById("memberName").textContent = member.name || "Member";

        // Show My Details
        document.getElementById("viewDetailsLink").addEventListener("click", () => {
          document.getElementById("contentArea").innerHTML = `
            <h2>My Details</h2>
            <p><strong>Email:</strong> ${member.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${member.phone || "N/A"}</p>
            <p><strong>Package:</strong> ${member.package || "Not Assigned"}</p>
            <p><strong>Joining Date:</strong> ${member.joiningDate || "N/A"}</p>
          `;
        });

        // Show Bills
        document.getElementById("viewBillsLink").addEventListener("click", async () => {
          const billsSnapshot = await db.collection("bills").where("memberId", "==", user.uid).get();
          let html = `<h2>My Bills</h2><table><thead>
            <tr><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>`;

          if (!billsSnapshot.empty) {
            billsSnapshot.forEach(doc => {
              const bill = doc.data();
              html += `<tr>
                <td>${bill.date || "N/A"}</td>
                <td>${bill.amount || "N/A"}</td>
                <td>${bill.status || "Pending"}</td>
              </tr>`;
            });
          } else {
            html += `<tr><td colspan="3">No bills found.</td></tr>`;
          }
          html += `</tbody></table>`;
          document.getElementById("contentArea").innerHTML = html;
        });

        // Show Notifications
        document.getElementById("viewNotificationsLink").addEventListener("click", async () => {
          const notifSnapshot = await db.collection("notifications").where("memberId", "==", user.uid).get();
          let html = `<h2>My Notifications</h2><ul>`;
          if (!notifSnapshot.empty) {
            notifSnapshot.forEach(doc => {
              const notif = doc.data();
              html += `<li>${notif.date || ""} - ${notif.message || "No message"}</li>`;
            });
          } else {
            html += `<li>No notifications found.</li>`;
          }
          html += `</ul>`;
          document.getElementById("contentArea").innerHTML = html;
        });

      } else {
        document.getElementById("contentArea").innerHTML = "<p>Member details not found.</p>";
      }
    } catch (err) {
      console.error("Error loading member data:", err);
    }
  });

  // Back button
  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "../select-role.html";
  });
});
