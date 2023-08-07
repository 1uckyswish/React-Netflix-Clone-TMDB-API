import React , {useState, useEffect} from 'react'
import axios from 'axios'
import "./slider.css"
import Genres from '../Genres/Genres'
import Ratings from '../Ratings/Ratings'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import {Link} from 'react-router-dom';

function Slider({apiKey, baseUrl}) {
    const [upcomingMovies, setUpcomingMovies]=useState([])
    const [index, setIndex]=useState(0)
    const [movieRatings, setMovieRatings]=useState([]);
    const imageBaseUrl="https://image.tmdb.org/t/p/original"


    useEffect (()=>{
        axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
        .then(res=>{
            console.log(res.data.results)
            setUpcomingMovies(res.data.results)
            const rating= res.data.results.map(movie => movie.vote_average/2)
            setMovieRatings(rating)
        })
        .catch(err=>console.log(err))
    }, [])



const sliderStyle={
    backgroundImage: `url("${imageBaseUrl}${upcomingMovies[index]?.backdrop_path}")`,
    backgroundSize: 'cover',
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    height: "60vh",
    position: 'relative'
}


const handleRight=()=>{
    setIndex(index + 1)
    if (index === upcomingMovies.length -1){
        setIndex(0)
    }

}

const handleLeft=()=>{
    setIndex(index - 1)
    if (index===0){
        setIndex(upcomingMovies.length - 1)
    }

}

    
  return (
      <div style={sliderStyle}>


    <div className="slider-overlay"></div>
    <MdKeyboardArrowLeft  onClick={handleLeft} className="left-arrow" />
    <MdKeyboardArrowRight onClick={handleRight} className="right-arrow" />
    <div className="slider-info">
        <h1>{upcomingMovies[index]?.title}</h1>
        <p className='slider-description'> {upcomingMovies[index]?.overview.slice(0,130)}..</p>
        <Genres moviesGenres={upcomingMovies[index]?.genre_ids} baseUrl={baseUrl} apiKey={apiKey}/>
        <p>Release Date: {upcomingMovies[index]?.release_date}</p>
        <Ratings movieRating={movieRatings[index]}/>
        <Link  to={`/moviedetails/${upcomingMovies[index]?.id}`} className="see-details">See Details</Link>



    </div>

    </div>
  )
}

export default Slider