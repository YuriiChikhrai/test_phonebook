document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clickme").addEventListener("click", (e) => {
    fetch(`${window.location.origin}/api/click`, {
      method: "POST",
    })
      .then(() => {
        window.location.reload();
      })
      .catch(console.error);
  });
});
