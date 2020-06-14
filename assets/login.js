document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementsByClassName("login")[0]
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      fetch(`${window.location.origin}/api/auth/login`, {
        method: "POST",
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then(() => {
          window.location.replace(window.location.origin);
        })
        .catch(console.error);
    });
});
