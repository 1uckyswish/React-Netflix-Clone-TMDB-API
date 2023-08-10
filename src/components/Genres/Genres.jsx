import React,{useState, useEffect} from 'react'
import axios from 'axios';


function Genres({apiKey, baseUrl, moviesGenres}) {
    const [ allGenres, setAllGenres]=useState([]);

useEffect(()=>{
    axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
    .then(res=>{
    setAllGenres(res.data.genres); 
})
.catch(err=>console.log(err))
}, [])


  return (
    <div style={{display:"flex"}}>
      <p>Genres: </p>
        {moviesGenres?.map((id, index)=>{
        const genre = allGenres.find((genre)=> genre.id === id);
        return(
            <p key={id}><span>&nbsp;</span>{genre?.name}{index !== moviesGenres.length - 1  && ','}
            </p>
        )
        })}
        
        
        
        
        </div>
  )
}

export default Genres