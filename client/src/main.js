const jokeSection = document.getElementById(`joke-section`);

async function getJokes() {
  const getData = await fetch(`http://localhost:8080/jokes`);
  const retrieveJokes = await getData.json();
  console.log(retrieveJokes);
  generateHTML(retrieveJokes);
}

function generateHTML(retrieveJokes) {
  retrieveJokes.forEach(function (item) {
    const jokeContainer = document.createElement("div");
    const jokeText = document.createElement("p");
    const jokePunchline = document.createElement("p");

    jokeText.innerText = item.joke;
    jokePunchline.innerText = item.punchline;

    jokeContainer.append(jokeText, jokePunchline);
    jokeSection.append(jokeContainer);
  });
}

getJokes();

const form = document.getElementById(`form`);

form.addEventListener(`submit`, async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const userInput = Object.fromEntries(formData);

  const sendToServer = await fetch(`http://localhost:8080/jokes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });
});
