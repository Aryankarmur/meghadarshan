import { IoSearchSharp } from "react-icons/io5";
import "./assets/css/Navbar.css";

const Navbar = ({ getCityLocation, isLoading }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchCity = e.target.city.value.trim();
    if (searchCity && !isLoading) {
      getCityLocation(searchCity.toLowerCase());
      e.target.reset();
    }
  };

  return (
    <nav>
      <div className="maxcontant">
        <a href="/" className="logo-link">
          <h1>MeghDarshan</h1>
        </a>
        <form onSubmit={handleSearch} role="search">
          <label htmlFor="desktop-city-search" className="visually-hidden">
            Search for a city
          </label>
          <input
            id="desktop-city-search"
            name="city"
            type="search"
            placeholder="Search for a city"
            disabled={isLoading}
            required
            aria-label="Search for a city"
          />
          <button type="submit" disabled={isLoading} aria-label="Submit search">
            <IoSearchSharp aria-hidden="true" />
          </button>
        </form>
      </div>
      <div className="responsive">
        <div className="namecity">
          <a href="/" className="logo-link">
            <h1>MeghDarshan</h1>
          </a>
        </div>
        <form onSubmit={handleSearch} role="search">
          <label htmlFor="mobile-city-search" className="visually-hidden">
            Search for a city
          </label>
          <input
            id="mobile-city-search"
            name="city"
            type="search"
            placeholder="Search for a city"
            disabled={isLoading}
            required
            aria-label="Search for a city"
          />
          <button type="submit" disabled={isLoading} aria-label="Submit search">
            <IoSearchSharp aria-hidden="true" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
