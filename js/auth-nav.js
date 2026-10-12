(function () {
  const authLink = document.getElementById("auth-link");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!authLink || !currentUser) {
    return;
  }

  authLink.textContent = "Logout (" + currentUser.name.split(" ")[0] + ")";
  authLink.href = "#";

  authLink.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.reload();
  });

  const resName = document.getElementById("res-name");
  const resEmail = document.getElementById("res-email");

  if (resName) {
    resName.value = currentUser.name;
  }
  if (resEmail) {
    resEmail.value = currentUser.email;
  }
})();