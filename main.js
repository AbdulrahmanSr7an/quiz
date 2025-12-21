let nextBtn = document.querySelector("#next");
let timer = document.querySelector(".timer");
let p = timer.querySelector("p");
let spanTim = p.querySelector("span");
let icons = document.querySelector(".icons");
let spanIcon = icons.querySelectorAll("span");
let spanIconActive = icons.querySelector(".active");
let myForm = document.forms[0];
let number = 0;
let userAnswer = [];
let allData;
// let pQuest = document.querySelector(".quest");
let grade = 0;
let setI;
let containerChose = document.querySelector(".container-chose");
let popup = document.querySelector(".popup");
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
      if (spanIcon[number]) {
        spanIcon[number].classList.add("active");
      }
      number += 1;
      if (number < 10) {
        spanTim.textContent = "6";
        addInputs(number, data);
        timerQuest();
      } else {
        clearInterval(setI);

        document.body.style.opacity = ".5";
        popup.style.opacity = "1";
        document.querySelector(
          ".pop"
        ).textContent = `Your Grade Is: ${grade} / 10`;
      }
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
    if (userAnswer.includes(label.textContent)) {
      label.style.color = "red";
      inpRadio.classList.add("false");
    }
    else if (data[numberQuestion].answers[i].bool === true) {
      label.style.color = "green";
      inpRadio.classList.add("true");
    }
    else {
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
      spanTim.textContent = "6";
      spanIcon[counter].classList.add("active");
      inputAnswer(counter, data);
    }
  };
};
document.querySelector(".popBtn").addEventListener("click", function (e) {
  document.body.style.opacity = "1";
  popup.style.opacity = "0";
  counter = 0;
  inputAnswer(counter, allData);
  clickFunAnswer(allData);
});
