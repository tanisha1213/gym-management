document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addDietForm");
  const memberId = new URLSearchParams(window.location.search).get("id"); // memberId passed in URL

  if (!memberId) {
    alert("No member selected for diet plan.");
    return;
  }

  function handleCustomToggle(selectId, inputId) {
    document.getElementById(selectId).addEventListener("change", (e) => {
      document.getElementById(inputId).style.display = e.target.value === "Custom" ? "block" : "none";
    });
  }

  handleCustomToggle("planNameSelect", "planNameCustom");
  handleCustomToggle("mealTimeSelect", "mealTimeCustom");
  handleCustomToggle("descriptionSelect", "descriptionCustom");
  handleCustomToggle("caloriesSelect", "caloriesCustom");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const planName = document.getElementById("planNameSelect").value === "Custom" 
      ? document.getElementById("planNameCustom").value.trim() 
      : document.getElementById("planNameSelect").value;

    const mealTime = document.getElementById("mealTimeSelect").value === "Custom" 
      ? document.getElementById("mealTimeCustom").value.trim() 
      : document.getElementById("mealTimeSelect").value;

    const description = document.getElementById("descriptionSelect").value === "Custom" 
      ? document.getElementById("descriptionCustom").value.trim() 
      : document.getElementById("descriptionSelect").value;

    const calories = document.getElementById("caloriesSelect").value === "Custom" 
      ? document.getElementById("caloriesCustom").value.trim() 
      : document.getElementById("caloriesSelect").value;

    try {
      await db.collection("members").doc(memberId).collection("dietPlans").add({
        planName,
        mealTime,
        description,
        calories,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Diet Plan assigned to member!");
      form.reset();
      document.querySelectorAll("#planNameCustom,#mealTimeCustom,#descriptionCustom,#caloriesCustom").forEach(el => el.style.display = "none");
    } catch (err) {
      console.error(err);
      alert("Error adding diet plan.");
    }
  });
});
