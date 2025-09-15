// js/select-role.js
function selectRole(role) {
  localStorage.setItem("selectedRole", role); // "Admin", "Member", "User"
  window.location.href = "signup.html"; // send to signup directly
}
