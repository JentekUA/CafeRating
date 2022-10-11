const cafes = document.querySelectorAll(".cafe-card");

cafes.forEach(cafe => {
  //configure delete confirmation
  const deleteBtn = cafe.querySelector(".delete");
  const delConfirm = cafe.querySelector(".del-confirm");
  deleteBtn.addEventListener("click", () => {
    delConfirm.classList.add("display");
  });

  //configure cancel btn
  const cancelBtn = delConfirm.querySelector(".cancel");
  cancelBtn.addEventListener("click", () => {
    delConfirm.classList.remove("display");
  });
});
