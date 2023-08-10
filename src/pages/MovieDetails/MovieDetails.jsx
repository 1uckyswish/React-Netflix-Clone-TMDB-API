import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';
import {UserContext} from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext';
import Review from '../../components/Review/Review';
import Genres from '../../components/Genres/Genres';
import Ratings from '../../components/Ratings/Ratings';
import './movie.css';


  

 
export default function MovieDetails({baseUrl,apiKey, serverUrl}) {

    const {movieid} = useParams();
    const [videoLink,setVideoLink]=useState(''); 
    const [movie,setMovie]=useState([]);
    const [movieRating,setMovieRating]=useState(0);
    const [reviews,setReviews]=useState([]);
    const [totalReviews,setTotalReviews]=useState(0)
    const [reviewNumber,setReviewNumber]=useState(3)
    const {darkMode,setDarkMode}=useContext(ThemeContext)
    const {user,token}=useContext(UserContext) 
    const [added,setAdded]=useState(false)


    

 
    
    useEffect(() => {  
      axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
      .then(res=>{
        console.log(res.data)
        setMovie(res.data)
        setMovieRating((res.data.vote_average)/2) 
      })
      .catch(err=>console.log(err))


      axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
      .then(res=>{
        console.log(res.data)
      const youtubeLink = res.data.results.filter(item=>item.site==="YouTube" && item.type==="Trailer")
      setVideoLink(youtubeLink[0]?.key)
      })

      axios.get(`${baseUrl}/movie/${movieid}/reviews?api_key=${apiKey}`)
      .then(res=>{
        // console.log(res.data)
        setTotalReviews(res.data.total_results)
        setReviews(res.data.results)
      })
      .catch(err=>console.log(err))


}, [movieid])



// const addToFavorites=()=>{
//   console.log(serverUrl)
//   if(!token){
//      alert('Please login to add a movie to your favorites.')
//   }else{
//     axios.post(`${serverUrl}favoriteMovies`,{
//       user_id:user._id,
//       movie_id:movie.id
//     })
//     .then(res=>{
//       setAdded(true)
//     })
//     .catch(err=>console.log(err))
//   }

// }

// const removeFromFavorites=()=>{
//   axios.delete(`${serverUrl}favoriteMovies/${user._id}/${movie.id}`)
//   .then(res=>{
//     console.log(res.data)
//     setAdded(false)
//   })
//   .catch(err=>console.log(err))
// }

useEffect(() => {
  axios.post(`${serverUrl}favoriteMovies/search`,{ 
    user_id:user._id,
    tmdb_id:movie.id
  })
  .then(res=>{
    if(res.data===null){ 
      setAdded(false)
    }else{ 
      setAdded(true)
    }
  })
  .catch(err=>console.log(err))
}, [user,movie])

return ( 
<div className={darkMode ?"movie-details-container" : "movie-details-container details-light"}>
  {
    videoLink ? 
    <div className="trailer-container">
    <ReactPlayer className="trailer-player" url={`https://www.youtube.com/watch?v=${videoLink}`}
        config={{
          youtube: {
            playerVars: { showinfo: 1,origin:"http://localhost:3000" }
          }
        }}
        // playing
        width='100%'
        height='100%'
        controls={true}
      />
  </div>
  : <div className="trailer-container-blank" style={{
    backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.poster_path}")`,
    backgroundPosition:"center",
    backgroundSize:"cover"
    }}><h1>No Trailers Released Yet</h1></div> 
}

  <div className={darkMode ?"details-container" :"details-container details-light" }>
        <div className="title-container">
          <h1>{movie.title}</h1>
          {/* {
            added 
            ? <span className="remove-btn" onClick={removeFromFavorites}>Remove from favorites.</span> 
            : <span className="add-btn" onClick={addToFavorites}>Add to favorites.</span>
          } */}
        </div>
        <Ratings movieRating={movieRating} />
        <div className="info-container">
           <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="details-poster"/>
           <div className="movie-info">
              <h2>{movie.tagline}</h2>
              <h4>{movie.overview}</h4>  
              <h4>Status: <span>{movie.status}</span></h4>
              <h4>Runtime: <span>{movie.runtime} min.</span></h4>
              <h4>Budget: <span>{movie.budget}</span></h4>
              <Genres component="details" movieGenres={movie?.genres} baseUrl={baseUrl} apiKey={apiKey}/>    
           </div> 
        </div>
        <div className="review-container">
            <p className="reviews-title">Reviews</p>
            {
                reviews.slice(0,reviewNumber).map(item=>{
                  return <Review key={item.id} review={item}/>
                })
            }
            {
                reviewNumber >= totalReviews 
                ? <p className="review-number" onClick={()=>setReviewNumber(3)}><em>End of reviews.Collapse</em></p>
                : <p className="review-number" onClick={()=>setReviewNumber(reviewNumber+3)}><em>Read more reviews</em></p>
            }
            
        </div>
  </div>

</div>

)
}