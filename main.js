let nextBtn = document.querySelector("#next");
let btnMode = document.querySelector(".btn-mode");
let linkMode = document.querySelector(".link-mode");
let timer = document.querySelector(".timer");
let p = timer.querySelector("p");
let pcate = document.querySelector(".pcateg");
let content = document.querySelector(".content");
let spanTim = p.querySelector("span");
let icons = document.querySelector(".icons");
let spanIcon = icons.querySelectorAll("span");
let spanIconActive = icons.querySelector(".active");
let myForm = document.forms[0];
let number = 0;
let userAnswer = [];
let allData;
let grade = 0;
let setI;
let containerChose = document.querySelector(".container-chose");
let popup = document.querySelector(".popup");
btnMode.addEventListener("click", function () {
  if (linkMode.getAttribute("href") === "styleDark.css") {
    linkMode.setAttribute("href","styleLight.css");
  }
  else {
    linkMode.setAttribute("href","styleDark.css");
  }
});
let timerQuest = function () {
  if (number > 0) {
    clearInterval(setI);
  }
  setI = setInterval(function () {
    if (parseInt(spanTim.textContent) > 0) {
      spanTim.textContent -= 1;
    } else {
      clearInterval(setI);
      nextBtn.click();
    }
  }, 1000);
};
let addInputs = function (numberQuestion, data) {
  containerChose.innerHTML = "";
  let pQuest = document.createElement("p");
  pQuest.className = "quest";
  pQuest.textContent = data[numberQuestion].question;
  containerChose.appendChild(pQuest);
  for (let i = 0; i < data[numberQuestion].answers.length; i++) {
    let containerDiv = document.createElement("div");
    containerDiv.className = "container-inputs";
    let inpRadio = document.createElement("input");
    inpRadio.type = "radio";
    inpRadio.name = "answer";
    inpRadio.value = `${data[numberQuestion].answers[i].bool}`;
    inpRadio.id = `${i}`;
    containerDiv.appendChild(inpRadio);
    let label = document.createElement("label");
    label.setAttribute("for", `${inpRadio.id}`);
    label.textContent = data[numberQuestion].answers[i].answer;
    containerDiv.appendChild(label);
    containerChose.append(containerDiv);
  }
  if (spanIcon[number]) {
    spanIcon[number].classList.add("active");
  }
};
let clickFun = function (data) {
  nextBtn.onclick = function (e) {
    e.preventDefault();
    let selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
      if (selectedOption.value === "true") {
        grade += 1;
      } else {
        userAnswer.push(selectedOption.nextSibling.textContent);
      }
    } else {
      userAnswer.push("");
    }
    
    number += 1;
    if (number < 10) {
      spanTim.textContent = "6";
      addInputs(number, data);
      timerQuest();
    } else {
      clearInterval(setI);
      content.style.opacity = ".4";
      timer.style.opacity = ".4";
      pcate.style.opacity = ".4";
      popup.style.display = "flex"
      document.querySelector(
        ".pop"
      ).textContent = `Your Grade Is: ${grade} / 10`;
    }
  };
};

fetch("question.json")
  .then((result) => {
    let myData = result.json();
    return myData;
  })
  .then((data) => {
    allData = data;
    addInputs(number, data);
    timerQuest();
    clickFun(data);
  });

let counter = 0;
let inputAnswer = function (numberQuestion, data) {
  containerChose.innerHTML = "";
  let pQuest = document.createElement("p");
  pQuest.className = "quest";
  pQuest.textContent = data[numberQuestion].question;
  containerChose.appendChild(pQuest);
  for (let i = 0; i < data[numberQuestion].answers.length; i++) {
    let containerDiv = document.createElement("div");
    containerDiv.className = "container-inputs";
    let inpRadio = document.createElement("input");
    inpRadio.type = "radio";
    inpRadio.name = "answer";
    inpRadio.value = `${data[numberQuestion].answers[i].bool}`;
    inpRadio.id = `${i}`;
    containerDiv.appendChild(inpRadio);
    let label = document.createElement("label");
    label.setAttribute("for", `${inpRadio.id}`);
    label.textContent = data[numberQuestion].answers[i].answer;
    containerDiv.appendChild(label);
    containerChose.append(containerDiv);
    if (userAnswer.includes(label.textContent) && label.textContent !== "") {
      label.style.color = "red";
      inpRadio.classList.add("false");
    } else if (data[numberQuestion].answers[i].bool === true) {
      label.style.color = "green";
      inpRadio.classList.add("true");
    } else {
      inpRadio.classList.add("not-found");
    }
  }
  spanIcon.forEach((ele) => {
    ele.classList.remove("active");
  });
  spanIcon[counter].classList.add("active");
};
let clickFunAnswer = function (data) {
  nextBtn.onclick = function (e) {
    counter += 1;
    e.preventDefault();
    if (counter >= 9) {
      nextBtn.style.opacity = 0.5;
      nextBtn.style.cursor = "default";
    }
    if (counter <= 9) {
      spanIcon[counter].classList.add("active");
      inputAnswer(counter, data);
    }
  };
};
document.querySelector(".popBtn").addEventListener("click", function (e) {
  spanTim.innerHTML = 0
  content.style.opacity = "1";
  timer.style.opacity = "1";
  pcate.style.opacity = "1";
  popup.style.display = "none";

  counter = 0;
  inputAnswer(counter, allData);
  clickFunAnswer(allData);
});
