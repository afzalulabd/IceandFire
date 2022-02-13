const API_URL = `https://anapioficeandfire.com/api/books/`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://anapioficeandfire.com/api/books/`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const getClassByRate = (vote) => {
  if (vote >= 7.5) return "green";
  else if (vote >= 7) return "orange";
  else return "red";
};

const showBooks = (books) => {
  main.innerHTML = "";
  books.forEach((book) => {
    const { name, isbn, authors, publisher,numberOfPages,released,characters} = book;
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
    <div class="book-info">
      <h3>${name}</h3>
      <div>
      ${authors}</div>
    </div>
    <div class="overview">
      <h3>isbn</h3>
      ${isbn}
      <h3>Publisher</h3>
      ${publisher} 
      <h3>Released Date</h3>
      ${released} 
      <h3>Pages</h3>
      ${numberOfPages} 
    </div>
  `;
    main.appendChild(bookElement);
    //main.appendChild(bookElement);
  });
};

const getBooks = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  showBooks(data);
};
getBooks(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getBooks(SEARCH_API + searchTerm);
    search.value = "";
  } else history.go(0);
});

