document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("selectedRole"); 

  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        if (role === "Admin") {
          window.location.href = "admin/dashboard.html";
        } else if (role === "Member") {
          window.location.href = "member/dashboard.html";
        } else if (role === "User") {
          window.location.href = "user/dashboard.html";
        } else {
          alert("Role not found. Please go back and select a role.");
          window.location.href = "select-role.html";
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  });
});
