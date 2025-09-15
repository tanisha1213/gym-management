document.addEventListener("DOMContentLoaded", () => {
  // Security check: Redirect to login if not signed in
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "../login.html";
    } else {
      document.getElementById("welcome").textContent = `Logged in as: ${user.email}`;
    }
  });

  // Logout functionality
  document.getElementById("logout").addEventListener("click", () => {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("selectedRole");
        window.location.href = "../login.html";
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        alert("Failed to logout. Check console.");
      });
  });
});
