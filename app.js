const inputName = document.querySelector(".name");
const inputSurname = document.querySelector(".surname");
const inputPhone = document.querySelector(".phone");
const inputEmail = document.querySelector(".email");
const listRef = document.querySelector(".phoneList");
const btnRef = document.querySelector(".submit");
const instance = basicLightbox.create(`
  <div class="backdrop">
    <div class="new__container">
       <input type="text" class="name" placeholder="Ім'я:">
       <input type="text" class="surname" placeholder="Прізвище:">
       <input type="tel" class="phone" placeholder="Телефон:">
       <input type="email" class="email" placeholder="Електрона адресса:">
       <div class="modal__box">
       <a href="#" class="close">Закрити</a>
       <button type="submit" class="save">Зберегти зміни</button>
       </div>
    </div>
  </div>
`);



const modal = instance.element();



const bookArray = JSON.parse(localStorage.getItem("information")) || [];
renderArray();


btnRef.addEventListener("click", (event) => {
  event.preventDefault();
  const nameValue = inputName.value.trim();
  const surnameValue = inputSurname.value.trim();
  const phoneValue = inputPhone.value.trim();
  const emailValue = inputEmail.value.trim();


  if (nameValue && surnameValue && phoneValue && emailValue) {
    bookArray.push({
      name: nameValue,
      surname: surnameValue,
      phone: phoneValue,
      email: emailValue,
    });
    inputName.value = "";
    inputSurname.value = "";
    inputPhone.value = "";
    inputEmail.value = "";
    renderArray();
  }
});



function renderArray() {
  const item = bookArray
    .map((item, index) => {
      return `<li class="list__item">
    <h2 class="list__text">${item.name}</h2>
    <h2 class="list__text">${item.surname}</h2>
    <p class="list__desc">${item.phone}</p>
    <a href="${item.email}" class="list__link">${item.email}</a>
    <a class="delete" data-action="${index}" href="#">Видалити</a>
    <button class="change" data-action="${index}">Змінити</button>
</li>`;
    })
    .join("");
  localStorage.setItem("information", JSON.stringify(bookArray));
  listRef.innerHTML = item;
}



listRef.addEventListener("click", (event) => {
  const target = event.target.nodeName;
  const index = event.target.dataset.action;
  const contact = bookArray[index];
  if (target === "BUTTON") {
    instance.show();
    modal.querySelector(".name").value = contact.name;
    modal.querySelector(".surname").value = contact.surname;
    modal.querySelector(".phone").value = contact.phone;
    modal.querySelector(".email").value = contact.email;
    modal.querySelector(".save").addEventListener("click", (event) => {
      event.preventDefault();
      const modalName = modal.querySelector(".name").value;
      const modalSurname = modal.querySelector(".surname").value;
      const modalPhone = modal.querySelector(".phone").value;
      const modalEmail = modal.querySelector(".email").value;



      if (modalName && modalSurname && modalPhone && modalEmail) {
        bookArray[index] = {
          name: modalName,
          surname: modalSurname,
          phone: modalPhone,
          email: modalEmail,
        };
        renderArray();
        instance.close();
      }
    });
  }


  if (target !== "A") {
    return;
  } else {
    bookArray.splice(index, 1);
    renderArray();
  }
});



modal.addEventListener("click", (event) => {
  const target = event.target.nodeName;
  if (target !== "A") {
    return;
  }
  instance.close();
});