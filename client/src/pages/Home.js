import React, {useContext} from 'react'
import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate  } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {AuthContext} from "../helpers/AuthContext"; 


function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext); 

  let navigate = useNavigate(); 

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");  //nagivate home unless logged in
    } else {
    axios.get("http://localhost:3001/posts", 
      { headers: { accessToken: localStorage.getItem("accessToken") } } ).then((response) => {  //get request for posts in database
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => { return like.PostId}));
      });
    }
  }, []);

    //post request to like and unlike a post
    const likeAPost = (postId) => {
      axios.post("http://localhost:3001/likes", { PostId: postId}, { headers: { accessToken: localStorage.getItem("accessToken") } } 
      ).then ((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => { return id!= postId ;}))
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  }

//Displaying all posts created 
  return (
    <div>
        {listOfPosts.map((value, key) => {   //list of all posts in database
        return ( 
          <div key={key} className='post' > 
            <div className='title'> {value.title} </div>
            <div className='body' onClick={() => {
              navigate(`/post/${value.id}`);
              }}> {value.postText} </div>
            <div className='footer'> {value.username}  
              <ThumbUpIcon onClick={() => (likeAPost(value.id))} 
                className={ likedPosts.includes(value.id) ? "unlikebtn" : "likeBtn" }
              />
              <label> {value.Likes.length} </label>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home