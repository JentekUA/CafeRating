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

  //configure edit form
  const editBtn = cafe.querySelector(".edit");
  const editForm = cafe.querySelector(".edit-form");
  const editToggles = editForm.querySelectorAll(".toggle");

  editBtn.addEventListener("click", e => {
    e.preventDefault();

    //fetch data and display it on form
    fetchCafeData(editForm.action).then(data => {
      const cafe = data.cafe;
      fillForm(editForm, cafe);
      setToggles(editToggles);
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
  configureToggles(editToggles);
});

async function fetchCafeData(url) {
  const promise = await fetch(url);
  const data = promise.json();

  return data;
}

async function fetchAllCafes(url) {
  const promise = await fetch(url);
  const data = promise.json();

  return data;
}

function fillForm(form, cafeData) {
  form.querySelector("input[name='name']").value = cafeData.name;
  form.querySelector("input[name='location']").value = cafeData.location;
  form.querySelector("input[name='location-url']").value = cafeData.map_url;
  form.querySelector("input[name='img-url']").value = cafeData.img_url;
  form.querySelector("input[name='sockets']").checked = cafeData.has_sockets;
  form.querySelector("input[name='wifi']").checked = cafeData.has_wifi;
  form.querySelector("input[name='calls']").checked = cafeData.can_take_calls;
  form.querySelector("input[name='bathroom']").checked = cafeData.has_toilet;
  form.querySelector("input[name='coffee-price']").value = cafeData.coffee_price;
  form.querySelector("input[name='number-of-seats']").value = cafeData.seats;
}

function setToggles(toggles) {
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
}

function configureToggles(toggles) {
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
}
