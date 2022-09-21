import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import JokeBible from "./components/JokeBible";
import SearchIcon from "./assets/assets_Homework_Front-End_01/search-copy@3x.png";
// import HomePage from "./components/HomePage";

const API_URL = "https://api.chucknorris.io/jokes/search";
const CATEGORIES_URL = "https://api.chucknorris.io/jokes/categories";

function App() {
  const [jokes, setJokes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [start, setStart] = useState(0);

  const searchjokes = async (query) => {
    const end = start + 9;

    const response = await fetch(`${API_URL}?query=${query}`);
    const data = await response.json();
    const page = data.result.slice(start, end);
    setJokes(page);
    // console.log(page);
  };
  const getCategories = async () => {
    const response = await fetch(`${CATEGORIES_URL}`);
    const data = await response.json();

    setCategories(data);
  };

  useEffect(() => {
    searchjokes("all");
    getCategories();
  }, []);

  const HomePage = ({ categorie }) => {
    return categorie.map((cat, i) => {
      return (
        <button onClick={() => searchjokes(cat)} key={i}>
          {cat}
        </button>
      );
    });
  };

  return (
    <div className="App">
      <h1>The Jokes Bible</h1>
      <div className="container">
        <div className="search">
          <input
            placeholder="Search for jokes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchjokes(searchTerm)}
          />
        </div>
      </div>
      <div className="container">
        <HomePage categorie={categories} />
      </div>
      <div className="container">
        {jokes?.length > 0 ? (
          <div className="container">
            {jokes.map((joke, i) => (
              <JokeBible joke={joke} key={i} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2> No jokes found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
