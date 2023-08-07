"use strict";

// Selectors
const passwordInputForm1 = document.querySelector("#password-form1"),
  iconPassForm1 = document.getElementById("show-pass-form1"),
  passReqIcon = document.getElementById("password-req"),
  passReqMenu = document.querySelector(".form2 .passwords-notes"),
  allRequirements = document.querySelectorAll(".requirement .requirement-content .req"),
  passwordInput = document.getElementById("password"),
  submitForm2 = document.getElementById("submit-form2"),
  confirmPasswordInput = document.getElementById("confirm-password"),
  form2Container = document.querySelector(".container-form2 .form2"),
  imageInput = document.querySelector("#image-input"),
  removeImage = document.querySelector(".forms-container .container-form2 .form2 .remove");





// Variables
let passReqSwitcher = false;






// Initiate code
let elePassMsg = document.createElement("div");
form2Container.append(elePassMsg);
elePassMsg.className = "password-massage";






// Functions
function minCharacters(str) {
  if (str.length >= 6) {
    allRequirements[1].classList.add("correct");
  } else {
    allRequirements[1].classList.contains("correct")
      ? allRequirements[1].classList.remove("correct")
      : "";
  }
}


function checkUpper(str) {
  let haveCapitalLetter = false;
  for (let char of str) {
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      haveCapitalLetter = true;
      break;
    }
  }

  if (haveCapitalLetter && passwordInput.value !== "") {
    allRequirements[2].classList.add("correct");
  } else {
    if (allRequirements[2].classList.contains("correct")) {
      allRequirements[2].classList.remove("correct");
    }
  }
}


function containsNumbers(str) {
  /\d/.test(str)
    ? allRequirements[3].classList.add("correct")
    : allRequirements[3].classList.remove("correct");
}


function containsSpecialChar(str) {
  let neededCharacters = allRequirements[4].children[0].textContent.slice(
    1,
    -1
  );

  let haveSpecialChar = false;
  for (let char of str) {
    if (neededCharacters.includes(char)) {
      haveSpecialChar = true;
      break;
    }
  }

  if (haveSpecialChar && passwordInput !== "") {
    allRequirements[4].classList.add("correct");
  } else {
    if (allRequirements[4].classList.contains("correct")) {
      allRequirements[4].classList.remove("correct");
    }
  }
}


function checkSpaces(str) {
  let haveSpace = false;
  str.split("").forEach((char) => {
    if (char == " ") haveSpace = true;
  });
  haveSpace
    ? allRequirements[0].classList.remove("correct")
    : allRequirements[0].classList.add("correct");
}


function handleSubmitForm2(e) {
  if (passwordInput.value !== confirmPasswordInput.value) {
    e.preventDefault();
    elePassMsg.textContent = "";
    elePassMsg.textContent = "The password confirmation does not match";
    elePassMsg.style.opacity = "1";
  }

  for (let i = 0; i < allRequirements.length; i++) {
    if (!allRequirements[i].classList.contains("correct")) {
      e.preventDefault();
      elePassMsg.textContent = "";
      elePassMsg.textContent =
        "The password is not valid, read the requirements";
      elePassMsg.style.opacity = "1";
      break;
    }
  }
}


function handleUploadImg() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploadedImage = reader.result;
    document.querySelector(
      "#display-image"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(this.files[0]);
}






// Events
iconPassForm1.addEventListener("click", () => {
  iconPassForm1.classList.toggle("bi-eye");
  iconPassForm1.classList.toggle("bi-eye-slash");
  passwordInputForm1.type =
    passwordInputForm1.type === "password" ? "text" : "password";
});


// Show/Hide password Requirements
passReqIcon.addEventListener("click", () => {
  passReqMenu.style.opacity = passReqSwitcher ? "1" : "0";
  passReqSwitcher = !passReqSwitcher;
});


// Check password rules
passwordInput.addEventListener("input", () => {
  let password = passwordInput.value;
  minCharacters(password);
  checkUpper(password);
  containsNumbers(password);
  containsSpecialChar(password);
  checkSpaces(password);
});


submitForm2.addEventListener("click", (e) => handleSubmitForm2(e));


// Upload image button
imageInput.addEventListener("change", () => handleUploadImg());


// Remove image button
removeImage.addEventListener("click", () => {
  document.querySelector("#display-image")
  .style.backgroundImage = `url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQDg8QDw4PDQ8NDw8PDw8NEA4NFREaFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFQ8QGC0dHR03Ky0rKy0tLS0rKy0rKy0tLS0tKysrLS0tLS03Ky0tLS03Ny0tKystKzcrKysrKy0rK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwYC/8QALRABAQABAgQFBAEEAwAAAAAAAAECAxEEBSExEkFRYXEiMoGRI0JyobETFVL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAeEQEAAgMBAQEBAQAAAAAAAAAAAQIDETFRIUESE//aAAwDAQACEQMRAD8A9gA975gAAAAAAAAA5Mkgi0nUgSEl9DdxxCQNgA06AAAAAAAAkAEAAAAAAAAbo3Ku8BwPj65dMf8AbM207EbVcMLl9s3XNHleV+6+Gf5a2np44yTGbPvdKbq1p6paXLNOd+vysTQxnbDH9R1Gdyp/MOf/AA4/+cf1HPU4LTy/pk+OiwU3JqGPxPK7OuF389vNQt8r02enVtbgcM7vZ19mov6nanjAlSu8fwHgnix3uPmpSKxO0pjUgDTgAAAAACQAQAAAAAABuzI68No+POTy8/h6DDGSbSbSTZmcmw63L06NVG8/VscGwDKoAAAAAD5zwmU2vax5zVw8OVnpXo6xOZ47at/bePqWWPiqAuiAAAAAAkAEAAAAAEgCLWBscn+y+9X4ocmv032yX4jbr0V5CQHGwAAAAoA+axubX+X8NqsLmV31b+m8fU8vFYBdAAAAAABIAIAAAAAARskZkafJcutnr1adY/J8b476bdWyjfr0U4QShlsAAAAABFef4y/yZf3V6Fgcfh4dS+93bx9TycVwF0AAAAAAEgAgAAAAoAIqUVnQ2uUYyYbzvbd15n8nv0X2yX0L9einEgONgAAAAADP5zp/TMvOXZfqnzi/x/OTtes24xYIiXoh55AHXAAAAEgAgAAAAAAAmBpclz63H16tV5zhte4ZTKfn4bujxWGfa9fTzQvH1bHZ2AYVAAAACAAzOdZ9sfe1d4jiMcPurD4rXupl4r+J7N0r92neXGJBaIQAHQAAABIAIAAAAAAABDvwF21Mfe7OFjpw12yxvpYzaCOvR+aUb9CPO9aQAAAAr5y6S32P1yeMDjM/FnbfK2OKdS9b81D0Q80yANOAAAAAAJABAAAAAAAABLt1ByZceg4PiZqY7zvJ1jvGZy3gs8b4relnZpx55eqs7gAcaAANlHmfFTGeGfdf8RfZXG8BnnlcpZte0m7tes24y4kym12vedKLvMANAAAAAACQAQAACLTYkAACde0v6cmQWeX6Hjy9p1r50+C1Mr0x2970bPB8PNPHbzvf5TtZSlN9dtkgkuAAAAI2SAw+a8P4cvFO2Xf2qo9FxGlM8bjWNrcDnje289uvRWtkL1/YVhOU27yx87qRKaQHQAAABIBsQBu5IIsHfh+Dzz8tp63ozs1txfenpZZdMZu1NDlmM65XxVewwk6Tp8dGJvrikY99Zmhyq/138RoaXD44z6cZHUYm0yrFIhFSDjQAAAAAAAAf6AHPU0scptZKoa/KvPC2b+VaY7FphmaxLzmroZ4X6o5vTZSXvJZ6VS4jluGXb6a3W/qc4vGNKLOtwGeHl4p6xWt279FNxKcxMAA4kA+Bhjb0k3q9ocqt653aekXuC4WaeO9+7z+fZa3TnItXHrrhocLhjOmM+b1dthKamkbJAdAAAAAAAAAAAAAAAAEVICNnLW4bDLvjHYHNMrX5Xe+F/DP1NO43bKbPS7uHF8PM8dr38r57txf1O2Px5/xC1/1mp6T9jX9Qx/lZu7EgJPQlAAAAAAAAAAAAAAAAAAAAAAJiAAAEgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAEgA/9k=")`;
});
