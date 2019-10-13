const url = "https://randomuser.me/api/?results=12&nat=us,au,ca,ch,de,gb,fr&inc=name, picture,email, location, phone, dob, nat & noinfo";
let index = 0;
const employees = [];
const list = document.getElementById("employee_list");
const modal = document.createElement("div");
const modalDetail = document.createElement("article");
const closeModal = document.createElement("button");
const prev = document.createElement("a");
const next = document.createElement("a");
const searchField = document.getElementById("search");


// importing 12 employees from https://randomuser.me
 function generateData() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      generateEmployees(results);
      console.log(results);
    })
    .catch(error => console.log("Oops! Something went wrong.", error))
}

// Employee objects are added to the employees array thumbnails are generated
function generateEmployees(data) {
  let html = [];
  let index = 0;
  data.map(result => {
    let name = `${changeCase(result.name.first)} ${changeCase(result.name.last)}`;
    let city = changeCase(result.location.city);
    const thumbnail = `
      <section class="employee-card" data-index=${index}><img class="employee-img" src=${result.picture.large}>
      <div class="card">
      <h2>${name}</h2>
      <p>${result.email.toLowerCase()}</p>
      <p>${city}</p>
      </div>
      </section>`;
    html += thumbnail;
	  
	  // generate the employee objects
    const employee = {
      index,
      name,
      city,
      phone: result.phone,
      email: result.email.toLowerCase(),
      street: `${result.location.street.number} ${changeCase(result.location.street.name)}`,
      nationality: result.nat.toUpperCase(),
      zipCode: result.location.postcode,
      image: result.picture.large,
      birthday: new Date(result.dob.date)
    }
    index += 1;
    // add the employee to the employees array
    employees.push(employee);
  });
  list.innerHTML = html;
}

function changeCase(str) {
  str = str.replace("ß", "ss");
  str = str.replace("-", " - ");
  str = str.replace("/", " - ");
  str = str.replace("\'", " \' ");
  let words = str.split(" ");
  let newString = [];
  words.forEach(word => newString += `${word[0].toUpperCase()}${word.slice(1)} `);
  newString = newString.replace(" - ", "-");
  newString = newString.replace(" \' ", "\'");
  return newString;
}

// call the information displayed in a modal
list.addEventListener("click", (e) => {
    if(e.target !== list) {
      const currentCard = e.target.closest(".employee-card");
      const index = currentCard.getAttribute("data-index");
      generateModal(index);
    }
  }
);

function generateModal(index) {

  // create the modal container
  modal.setAttribute("id", "employee-modal");
  modal.style.display = "block";

  // create html for modal
  createModalDetail(index);
  modal.appendChild(modalDetail);
  document.body.appendChild(modal);
}

function createModalDetailHTML(employee) {
  const employeeDetail = `
    <img class="employee-img" src=${employee.image}>
    <div class="modal-details">
    <h2>${employee.name}</h2>
    <p>${employee.email}</p>
    <p>${employee.city}</p>
    <hr>
    <p>${employee.phone}</p>
    <p>${employee.street}, ${employee.nationality} ${employee.zipCode}</p>
    <p>Birthday: ${employee.birthday.getMonth()}/${employee.birthday.getDate()}/${employee.birthday.getFullYear()}</p>
    </div>
    `;
  return employeeDetail;
}

function addNavigation(parent, index) {
  // create x button
  closeModal.classList.add("close-modal");
  closeModal.innerHTML = "Close Employee Details";
  parent.appendChild(closeModal);
  // create arrows
  if (index > 0) {
    prev.classList.add("prev");
    prev.innerHTML = "<";
    parent.appendChild(prev);
  }

  if (index < employees.length -1) {
    next.classList.add("next");
    next.innerHTML = ">";
    parent.appendChild(next);
  }
}

// add functionallity to the arrows and x button
modal.addEventListener("click", (e) => {
  if(e.target === closeModal) {
    modal.removeChild(modalDetail);
    modal.style.display = "none";
  } else if(e.target === prev) {
    // display previous
    index --;
    employee = employees[index];

    modalDetail.innerHTML = createModalDetailHTML(employee);
    addNavigation(modalDetail, index);
  } else if(e.target === next) {
    // display next
    index ++;
    employee = employees[index];
    modalDetail.innerHTML = createModalDetailHTML(employee);
    addNavigation(modalDetail, index);
  }
});

function createModalDetail(index) {
  modalDetail.setAttribute("class", "modal-detail");
  let employee = employees[index];
  modalDetail.innerHTML = createModalDetailHTML(employee);
  addNavigation(modalDetail, index);
}

generateData();

// Search for employees
function search() {
  let searchValue = searchField.value.toLowerCase();
  let employeeCard = document.querySelectorAll(".employee-card");
  let employeeText = document.querySelectorAll(".card");
  for (let i = 0; i < employeeCard.length; i++) {
    let title = employeeText[i].getElementsByTagName("h2")[0];
    let name = title.textContent;
    name = removeAccent(name);
    if (name.toLowerCase().indexOf(searchValue) > -1) {
      employeeCard[i].style.display = "";
    } else {
      employeeCard[i].style.display = "none";
    }
  }
}

// remove Accents for search
function removeAccent(str) {
  str = str.replace("ß", "ss");
  str = str.replace(/[éêèë]/gi, "e");
  str = str.replace(/[äàâ]/gi, "a");
  str = str.replace(/[öôò]/gi, "o");
  str = str.replace(/[üûù]/gi, "u");
  return str;
}

searchField.addEventListener("keyup", (e) => search());

