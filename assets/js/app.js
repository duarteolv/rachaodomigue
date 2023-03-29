(function () {
  const CLOSE_BUTTON_MESSAGE = "Fechar";
  window.onload = function () {
    const form = document.querySelector("form.send-mail");
    const closeBtn = document.querySelector(".close-menu");
    const menuItems = document.querySelectorAll("nav ul li");

    menuItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        closeBtn.checked = false;
      });
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const validator = new Pristine(this);

      if (validator.validate()) {
        Swal.showLoading();
        const userData = validator.fields.reduce((acc, input) => {
          acc[input.input.name] = input.input.value;
          return acc;
        }, {});
        const isSuccess = await fetch("/contato", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((r) => r.json());
        Swal.hideLoading();
        if (isSuccess.success) {
          return Swal.fire({
            title: "Gooooool!",
            text: "Sua mensagem foi enviada!",
            icon: "success",
            confirmButtonText: CLOSE_BUTTON_MESSAGE,
          });
        } else {
          return Swal.fire({
            title: "Na trave !",
            text: "Verifique seus dados ou tente novamente mais tarde!",
            icon: "error",
            confirmButtonText: CLOSE_BUTTON_MESSAGE,
          });
        }
      }
    });
  };
})();
