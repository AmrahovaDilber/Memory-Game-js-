const items = [
  {
    id: 1,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-1.png",
  },
  {
    id: 2,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-2.png",
  },
  {
    id: 3,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-3.png",
  },
  {
    id: 4,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-4.png",
  },
  {
    id: 5,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-5.png",
  },
  {
    id: 6,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-6.png",
  },
  {
    id: 7,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-7.png",
  },
  {
    id: 8,
    frontImg: "./assets/images/question.jpg",
    backImg: "./assets/images/img-8.png",
  },
];

const pairs = [...items, ...items];
const cardsContainer = document.querySelector("#cards");
const resetButton = document.querySelector("#reset");
let flippedCards = [];
let matchedCards = [];

function createUi() {
  cardsContainer.innerHTML = "";
  shuffle(pairs);
  pairs.forEach((item, index) => {
    cardsContainer.innerHTML += `
        <div data-id="${index}" class="card border border-gray-300 p-2 flex flex-col items-center w-50 h-40 m-1 bg-white shadow-lg cursor-pointer">
          <img src="${item.frontImg}" alt="front" class="front w-full h-full object-cover rounded-md">
          <img src="${item.backImg}" alt="back" class="back w-full h-full object-cover rounded-md hidden">
        </div>
      `;
  });
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this)) {
    this.querySelector(".front").classList.toggle("hidden");
    this.querySelector(".back").classList.toggle("hidden");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const id1 = card1.getAttribute("data-id");
  const id2 = card2.getAttribute("data-id");
  console.log(id1, id2);
  const isMatch = pairs[id1].id === pairs[id2].id;
  console.log(pairs[id1].id);
  console.log(pairs[id2].id);
  console.log(pairs[id1]);
  console.log(pairs[id2]);
  if (isMatch) {
    matchedCards.push(card1, card2);
    if (matchedCards.length === pairs.length) {
      alert("Congratulations! You've matched all pairs.");
    }
  } else {
    card1.querySelector(".front").classList.remove("hidden");
    card1.querySelector(".back").classList.add("hidden");
    card2.querySelector(".front").classList.remove("hidden");
    card2.querySelector(".back").classList.add("hidden");
  }

  flippedCards = [];
}

resetButton.addEventListener("click", () => {
  matchedCards = [];
  flippedCards = [];
  createUi();
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

createUi();
