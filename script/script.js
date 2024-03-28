document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchQuery = document.getElementById("search").value;
    const url =
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchQuery;

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          console.log("Network is not OK");
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then(function (jsonData) {
        console.log(jsonData);
        const container = document.getElementById("dictionaryData");
        container.innerHTML = "";

        jsonData.forEach((data) => {
          createDictionaryCard(data, container);
        });
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  });

function createDictionaryCard(data, container) {
  const card = document.createElement("div");
  card.classList.add("dictionary-card");

  const wordHeading = document.createElement("h2");
  wordHeading.textContent = data.word;
  card.appendChild(wordHeading);

  const phonetic = document.createElement("p");
  phonetic.textContent = `Phonetic: ${data.phonetic}`;
  card.appendChild(phonetic);

  data.phonetics.forEach((phonetic) => {
    const phoneticText = document.createElement("p");
    phoneticText.textContent = `Phonetic Text: ${phonetic.text}`;
    card.appendChild(phoneticText);
    if (phonetic.audio) {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = phonetic.audio;
      card.appendChild(audio);
    }
  });

  data.meanings.forEach((meaning) => {
    const partOfSpeechHeading = document.createElement("h3");
    partOfSpeechHeading.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
    card.appendChild(partOfSpeechHeading);

    meaning.definitions.forEach((definition) => {
      const definitionPara = document.createElement("p");
      definitionPara.textContent = `Definition: ${definition.definition}`;
      card.appendChild(definitionPara);

      if (definition.example) {
        const example = document.createElement("p");
        example.textContent = `Example: ${definition.example}`;
        card.appendChild(example);
      }
    });
  });

  container.appendChild(card);
}
