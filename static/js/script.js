const cafes = document.querySelectorAll(".cafe-card");

cafes.forEach(cafe => {
  //configure delete confirmation
  const deleteBtn = cafe.querySelector(".delete");
  const delConfirm = cafe.querySelector(".del-confirm");
  deleteBtn.addEventListener("click", () => {
    delConfirm.classList.add("display");
  });

  //configure cancel btn
  const cancelDel = delConfirm.querySelector(".cancel");
  cancelDel.addEventListener("click", () => {
    delConfirm.classList.remove("display");
  });

  //configure edit form appearence
  const editBtn = cafe.querySelector(".edit");
  const editForm = cafe.querySelector(".edit-form");
  editBtn.addEventListener("click", () => {
    editForm.classList.add("display");
  });

  //configure cancel editing
  const cancelEdit = editForm.querySelector(".cancel");
  cancelEdit.addEventListener("click", () => {
    editForm.classList.remove("display");
  });

  //configure edit form toggles
  const toggles = editForm.querySelectorAll(".toggle");
  toggles.forEach(toggle => {
    const checkBtn = toggle.querySelector(".toggle-check");
    const uncheckBtn = toggle.querySelector(".toggle-uncheck");
    const checkbox = toggle.querySelector(".hidden-checkbox");

    if (checkbox.checked) {
      checkBtn.classList.add("checked");
      uncheckBtn.classList.remove("checked");
    } else {
      checkBtn.classList.remove("checked");
      uncheckBtn.classList.add("checked");
    }

    //add checking logic for buttons
    checkBtn.addEventListener("click", e => {
      e.preventDefault();
      checkBtn.classList.add("checked");
      uncheckBtn.classList.remove("checked");
      checkbox.checked = true;
    });

    uncheckBtn.addEventListener("click", e => {
      e.preventDefault();
      checkBtn.classList.remove("checked");
      uncheckBtn.classList.add("checked");
      checkbox.checked = false;
    });
  });
});
