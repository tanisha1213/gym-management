document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("exportBtn").addEventListener("click", async () => {
    try {
      const snapshot = await db.collection("members").get();
      if (snapshot.empty) {
        alert("No members found!");
        return;
      }

      const data = [["Full Name", "Email", "Phone", "Joining Date", "Package"]];

      snapshot.forEach(doc => {
        const m = doc.data();
        data.push([
          m.fullName || "",
          m.email || "",
          m.phone ? m.phone.toString() : "",
          m.joiningDate || "",
          m.package || ""
        ]);
      });

      // Create worksheet
      const ws = XLSX.utils.aoa_to_sheet(data);

      // Format Phone as text
      ws["C2"].z = "@";

      // Create workbook and export
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Members Report");
      XLSX.writeFile(wb, "members_report.xlsx");

    } catch (err) {
      console.error("Export error: ", err);
      alert("Failed to export report.");
    }
  });
});
