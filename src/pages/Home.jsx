import MovieCard from "../components/MovieCard"
import { useState,useEffect } from "react";
import { searchMovies,getPopularMovies } from "../services/api";
import "../css/Home.css"
// will create a component Home in the Home page 
function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const [movies,setMovies]= useState([]);
    useEffect(()=>{
        const loadPopularMovies = async () =>{
            try{
                const popularMovies= await getPopularMovies()
                setMovies(popularMovies)
            }catch(err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally{
                setLoading(false)
            } 
        }
        loadPopularMovies()
    },[])
    const handleSearch = async(e) => {

        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return
        
        setLoading(true)
        try{
            const searchResults=await searchMovies(searchQuery);
            setMovies(searchResults)
            setError(null)

        }catch(err){
            console.log(err)
            setError("Failed to fetch movies")
        }finally{
            setLoading(false)
        }
        setSearchQuery("")
    };

    // return (
    //     <div className="home">
    //         <form onSubmit={handleSearch} className="search-form">
    //             <input type="text" placeholder="Search for movies.." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    //             <button className="search-button" type="submit">Search</button>
    //         </form>

    //         {loading ? (<div className="loading">Loading...</div>):(
    //         <div className="movies-grid">
    //             {movies.map((movie) => movie.title.toLowerCase().startsWith(searchQuery) && (
    //                 <MovieCard movie={movie} key={movie.id} />
    //             ))}
    //         </div>)

    //     </div>
    // );

return (
  <div className="home">
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search for movies.."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" type="submit">Search</button>
    </form>

    {error && <div className="error-message">{error}</div>}

    {loading ? (
      <div className="loading">Loading...</div>
    ) : (
      <div className="movies-grid">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    )}
  </div>
);
}


export default Home;