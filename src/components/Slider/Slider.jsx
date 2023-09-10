import React , {useState, useEffect} from 'react'
import axios from 'axios'
import "./slider.css"
import Genres from '../Genres/Genres'
import Ratings from '../Ratings/Ratings'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import {Link, useNavigate} from 'react-router-dom';

function Slider({apiKey, baseUrl}) {
    const [upcomingMovies, setUpcomingMovies]=useState([])
    const [index, setIndex]=useState(0)
    const [movieRatings, setMovieRatings]=useState([]);
    const imageBaseUrl="https://image.tmdb.org/t/p/original"
    const navigate = useNavigate();

    const handlePage=()=>{
    scrollTo({top: 0, left: 0, behavior: "smooth"})
    navigate(`/moviedetails/${upcomingMovies[index]?.id}`)
    // window.location.reload(); // Auto-refresh the page
}

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
    backgroundPosition: "top",
    backgroundRepeat: 'no-repeat',
    height: "60vh",
    position: 'relative',
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
        <p>Release Date: {upcomingMovies[index]?.release_date && upcomingMovies[index].release_date.split('-').reverse().join('-').replace(/(\d{2})-(\d{2})-(\d{4})/, '$2-$1-$3')}</p>
        <Ratings movieRating={movieRatings[index]}/>
        <p className='see-more-btn' onClick={handlePage}>See Details</p>



    </div>

    </div>
  )
}

export default Slider