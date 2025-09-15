document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("selectedRole"); // Admin / Member / User

  //LOGIN 
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[name="email"]').value.trim();
      const password = loginForm.querySelector('input[name="password"]').value;

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        redirectToDashboard(role);
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // ===== SIGNUP =====
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = signupForm.querySelector('input[name="email"]').value.trim();
      const password = signupForm.querySelector('input[name="password"]').value;

      try {
        const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);

        if (role === "Member") {
          await db.collection("members").doc(userCred.user.uid).set({
            fullName: email.split("@")[0], // default name from email
            email: email,
            phone: "Not Provided",
            joiningDate: new Date().toISOString().split("T")[0],
            package: "Not Assigned",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }

        redirectToDashboard(role);
      } catch (err) {
        alert(err.message);
      }
    });
  }
});

// Helper function
function redirectToDashboard(role) {
  if (role === "Admin") {
    window.location.href = "admin/dashboard.html";
  } else if (role === "Member") {
    window.location.href = "member/dashboard.html";
  } else {
    window.location.href = "user/dashboard.html";
  }
}
