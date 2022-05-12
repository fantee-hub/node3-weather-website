console.log("Client side javascript loaded!");

const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = weatherInput.value;

  messageOne.textContent = "Loading Weather info...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${inputValue}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.weatherInfo;
        messageTwo.textContent = data.location;
      }
    });
  });
});
