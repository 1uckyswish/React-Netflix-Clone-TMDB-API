import React,{useState,useEffect,useContext} from 'react';
import avatar from '../../assets/avatar.gif';
import './review.css';
import {ThemeContext} from '../../context/ThemeContext';
 

function Review({review}) {
    const [seeMore,setSeeMore]=useState(false);
    const [imageError, setImageError] = useState(false);
    const {darkMode,setDarkMode}=useContext(ThemeContext)

    
  return ( 
        <div key={review.id}  className="review"> 
            <div className="avatar-container">
                <img className="avatar" src={imageError ? avatar : `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`} alt="avatar"
                     onError={() => setImageError(true)}/>
                <p>{review.author}</p>
            </div>
            
            {
                !seeMore 
                ? <p  className={darkMode ? "content":"content content-light"}>{review.content.slice(0,300)}...<span onClick={()=>setSeeMore(true)} className="read-more"> read more</span></p>
                : <p className={darkMode ? "content":"content content-light"}>{review.content}<span onClick={()=>setSeeMore(false)} className="read-less"> read less</span></p>
            }
            
            
        </div>
  )
}

export default Review 