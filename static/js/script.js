const cafes = document.querySelectorAll(".cafe-card");
const edit = document.querySelectorAll(".edit");

edit.forEach((item, idx) => {
  item.addEventListener("click", () => {
    console.log(cafes[idx].querySelectorAll(".prop-value"));
  });
});
