const cafes = document.querySelectorAll(".cafe-card");

cafes.forEach(cafe => {
  //configure delete confirmation
  const deleteBtn = cafe.querySelector(".delete");
  const delConfirm = cafe.querySelector(".del-confirm");
  deleteBtn.addEventListener("click", e => {
    e.preventDefault();
    delConfirm.classList.add("display");
  });

  //configure cancel btn
  const cancelDel = delConfirm.querySelector(".cancel");
  cancelDel.addEventListener("click", e => {
    e.preventDefault();
    delConfirm.classList.remove("display");
  });

  //configure edit form appearence
  const editBtn = cafe.querySelector(".edit");
  const editForm = cafe.querySelector(".edit-form");
  const toggles = editForm.querySelectorAll(".toggle");

  editBtn.addEventListener("click", e => {
    e.preventDefault();

    //fetch data and display it on form
    fetchCafeData(editForm.action).then(data => {
      const cafe = data.cafe;
      editForm.querySelector("input[name='name']").value = cafe.name;
      editForm.querySelector("input[name='location']").value = cafe.location;
      editForm.querySelector("input[name='location-url']").value = cafe.map_url;
      editForm.querySelector("input[name='img-url']").value = cafe.img_url;
      editForm.querySelector("input[name='sockets']").checked = cafe.has_sockets;
      editForm.querySelector("input[name='wifi']").checked = cafe.has_wifi;
      editForm.querySelector("input[name='calls']").checked = cafe.can_take_calls;
      editForm.querySelector("input[name='bathroom']").checked = cafe.has_toilet;
      editForm.querySelector("input[name='coffee-price']").value = cafe.coffee_price;
      editForm.querySelector("input[name='number-of-seats']").value = cafe.seats;

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
      });
    });

    editForm.classList.add("display");
  });

  //configure cancel editing
  const cancelEdit = editForm.querySelector(".cancel");
  cancelEdit.addEventListener("click", e => {
    e.preventDefault();
    editForm.classList.remove("display");
  });

  ///add checking logic for toggle buttons
  toggles.forEach(toggle => {
    const checkBtn = toggle.querySelector(".toggle-check");
    const uncheckBtn = toggle.querySelector(".toggle-uncheck");
    const checkbox = toggle.querySelector(".hidden-checkbox");

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

async function fetchCafeData(url) {
  const promise = await fetch(url);
  const data = promise.json();

  return data;
}
