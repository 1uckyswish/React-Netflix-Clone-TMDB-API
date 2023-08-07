import React,{useState,useEffect} from 'react';
import './movie.css';
import {Link} from 'react-router-dom';
import Ratings from '../Ratings/Ratings';

 

export default function MovieCard({data,imageUrl,width,height,cardStyle,radius}) {


const [rating,setRating]=useState(Math.round(data?.vote_average/2))

const imageStyle={
  backgroundImage:`url("https://image.tmdb.org/t/p/w500/${imageUrl}")`, 
  width:width,
  height:height,
  backgroundRepeat: "no-repeat", 
  backgroundSize: 'cover',
  backgroundPosition:'center', 
  position:'relative',
  borderRadius:radius, 
  boxShadow: cardStyle==="popular-card"?"0px 0px 10px 0px rgba(118,118,118,0.75)":null
}

  return (
    <Link  to={data.id ? `/moviedetails/${data?.id}`:`/moviedetails/${data?.tmdb_id}`} className={cardStyle}>
      <div style={imageStyle}>
          <div className="movie-info-top">
            <Ratings movieRating={rating}/>
          </div> 
          <div className="movie-info-bottom">  
            <p>{data?.title}</p>
            <p>Rating: {rating}</p>
          </div>  
      </div> 
      {
        cardStyle==="top-rated-card" 
        ? <p>{data?.title}</p>
        : null
      }
    
    </Link>
  )
} 