document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");

  var issueButton = document.querySelectorAll(".issue");
  var unIssueButton = document.querySelectorAll(".unissue");

  var span = document.getElementsByClassName("close")[0];

  issueButton.forEach(function (button) {
    button.addEventListener("click", () => {
      modal.style.display = "block";

      var bookContainer = button.closest(".class");
      var ISBN = bookContainer.querySelector(".ISBN").innerText;

      document.getElementById("ISBN-FIELD-ISSUE").value = ISBN;
    });
  });

  unIssueButton.forEach(function (button) {
    button.addEventListener("click", () => {
      var isbn = button.getAttribute("data-isbn");

      fetch("/admin/unissue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isbn: isbn }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("book returned");
          } else {
            console.error("failed to return book");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      location.reload();
    });
  });

  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  document.getElementById("issue-confirm").onclick = () => {
    modal.style.display = "none";
    document.getElementById("modalForm").submit();
  };
});
