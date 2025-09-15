document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  // Debug log
  console.log("Selected role:", localStorage.getItem("selectedRole"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedRole = localStorage.getItem("selectedRole");
    if (!selectedRole) {
      alert("Please go back and select a role first.");
      window.location.href = "select-role.html";
      return;
    }

    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);

      if (selectedRole === "Member") {
        await db.collection("members").doc(userCred.user.uid).set({
          email: email,
          joiningDate: new Date().toISOString().split("T")[0],
          package: "Not Assigned",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      if (selectedRole === "Admin") {
        window.location.href = "admin/dashboard.html";
      } else if (selectedRole === "Member") {
        window.location.href = "member/dashboard.html";
      } else {
        window.location.href = "user/dashboard.html";
      }
    } catch (err) {
      console.error("Signup error: ", err);
      alert(err.message);
    }
  });
});
