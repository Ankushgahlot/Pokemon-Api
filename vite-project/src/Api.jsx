import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BiSolidRocket } from "react-icons/bi";
import Pokemin from "./pokemin";
import { BsSendFill } from "react-icons/bs"

const Api = () => { 
  const [Result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [Page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchInput = useRef(null);
  const ITEMS_PER_PAGE = 40;

  const GotoTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const resetSearch = () => {
    setPage(1);
    fetchAPI();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  const API = "https://pokeapi.co/api/v2/pokemon";

  const fetchAPI = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API}?limit=${ITEMS_PER_PAGE}&offset=${(Page - 1) * ITEMS_PER_PAGE}`);
      const PokemonResults = res.data.results;
      const PokemonResultsPromise = PokemonResults.map((pokemon) => axios.get(pokemon.url));
      const pokemonData = await axios.all(PokemonResultsPromise);
      const PokeListResult = pokemonData.map((PokeData) => {
        const pokemon = PokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
          types: pokemon.types
        }
      });

      setResult(PokeListResult);
      setIsLoading(false);
      setTotalPages(Math.ceil(res.data.count / ITEMS_PER_PAGE));
    } catch (error) {
      setIsLoading(false);
      setNotFound(true);
    }
  }, [Page]);

  useEffect(() => {
    fetchAPI();
  }, [Page, fetchAPI]);

  return (
    <>
      <div className="bg-slate-800 flex justify-between items-center w-[100%] fixed top-0 pt-1 pb-1 pl-5 pr-5">
        <h1 className="text-slate-300 text-2xl font-semibold mb-5 mt-2">
          Pokemons
        </h1>
      </div>
      <div className="">
        {isLoading ? (
          <div className="h-24 w-24 flex justify-center items-center absolute top-52 left-[550px] rounded-full border-[9px] border-l-slate-800 animate-spin duration-1000">
          </div>
        ) : (
          <div>
            <div className="text-center mb-8 mt-24">
              <div className="flex mt-6 justify-center">
                <p className="text-slate-800 tracking-tight text-4xl font-bold">Choose Your Favorite Pokemon</p>
              </div>
              <div className="flex justify-evenly items-center flex-wrap">
                {Result.map((p) => (
                  <Link key={p.id} to={`/Api/${p.id}`}>
                    <Pokemin name={p.name} image={p.image} key={p.id} types={p.types} />
                  </Link>
                ))}
              </div>
              <div className="mt-20 mb-20">
                {Page > 1 && (
                  <button
                    onClick={() => setPage(Page - 1)}
                    className="bg-slate-800 pl-6 pr-6 pt-4 pb-4 mr-10 rounded text-white font-semibold cursor-pointer"
                  >
                    Previous
                  </button>
                )}
                {Page < totalPages && (
                  <button
                    onClick={() => setPage(Page + 1)}
                    className="mr-4 bg-slate-800 pl-6 pr-6 pt-4 pb-4 ml-10 rounded text-white font-semibold cursor-pointer"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            <button onClick={GotoTop} className="bg-slate-800 bottom-16 left-1 rounded-full p-1 sticky transform -rotate-45">
              <BiSolidRocket className="text-3xl text-slate-300 rounded-full" />
            </button>
            <footer className="bg-slate-800 h-40 mt-10 pb-5 pt-2 flex-wrap w-full flex justify-between pl-5 pr-5 items-center absolute">
              <div className="text-slate-300 font-semibold text-3xl">Artify</div>
              <div className="text-slate-300 font-medium">
                Pokemons Provides You Different Pokemons Which Can Help You <br /> To Do Your Work Professionally
              </div>
              <div>
                <div className="flex gap-5 mb-2 max-[445px]:mt-3">
                  <Link to=""><FaLinkedinIn className="p-2 bg-slate-300 text-4xl rounded" /></Link>
                  <Link to=""><FaTwitter className="p-2 bg-slate-300 text-4xl rounded" /></Link>
                  <Link to=""><FaInstagram className="p-2 bg-slate-300 text-4xl rounded" /></Link>
                </div>
                <form className="flex justify-center items-center" action="https://formspree.io/f/mleqnbww" method="POST">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email..."
                    className="bg-slate-300 pt-2 pb-2 rounded-l pl-3 w-80 max-[445px]:w-64 pr-3 outline-none placeholder:text-slate-800 font-semibold"
                  />
                  <button className="pt-3 pb-3 pl-2 pr-2 rounded-r border-l-2 border-l-slate-800 bg-slate-300 text-slate-800 font-semibold">
                    <BsSendFill className="object-cover" />
                  </button>
                </form>
              </div>
            </footer>
          </div>
        )}
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default Api;
