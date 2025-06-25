import { IoSearchSharp, IoLocationSharp } from "react-icons/io5";
import "./assets/css/Navbar.css";
import { useEffect, useState } from "react";
const Navbar = ({ getCityLocation }) => {
  const [city, setCity] = useState("Delhi");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCityLocation(city.toLocaleLowerCase());
      console.log(data);
    };
    fetchData();
  }, [city]);

  // const handelcitySearch = async (e) => {
  //   e.preventDefault();

  //   if (city === "") {
  //     alert("Please enter a city name");
  //     return;
  //   } else {
  //       const data = await getCityLocation(city.toLocaleLowerCase());
  //       e.target.reset(); // Reset the form after submission
  //   }
  // };

  return (
    <nav>
      <div className="maxcontant">
        <h1>MeghDarshan</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCity(e.target.city.value);
            e.target.reset();
          }}
        >
          <input
            name="city"
            type="search"
            placeholder=" Search for a city "
            // onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">
            <IoSearchSharp />
          </button>
        </form>
        <div className="city">
          <p>
            <IoLocationSharp /> <span>{city.toUpperCase()}</span>
          </p>
        </div>
      </div>
      <div className="responsive">
        <div className="namecity">
          <h1>MeghDarshan</h1>
          <div className="city">
            <p>
              <IoLocationSharp /> <span>{city.toUpperCase()}</span>
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCity(e.target.city.value);
            e.target.reset();
          }}
        >
          <input
            name="city"
            type="search"
            placeholder=" Search for a city "
            // onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">
            <IoSearchSharp />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
