import React, { useContext} from 'react'
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../helpers/AuthContext";
import { useNavigate  } from "react-router-dom";



function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext); 

    let navigate = useNavigate(); 

    //get request for specific post via id of post
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    const addComment = () => {  //post request to add a comment
        axios.post("http://localhost:3001/comments", 
        {
            commentBody: newComment, 
            PostId: id,
        },
        { 
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        )
        .then((response) => { 
            if (response.data.error) {
                alert (response.data.error);
            } else {
                const commentToAdd = {
                    commentBody: newComment,
                    username: response.data.username,
                };
                setComments([...comments, commentToAdd]);
                setNewComment("");
            }
        });
    }

    const deleteComment = (id) => {  //delete request to delete comment
        axios.delete(`http://localhost:3001/comments/${id}`, {headers: { accessToken: localStorage.getItem('accessToken')},
    }).then (() => {
        setComments(comments.filter((val) => {
            return val.id != id;
        }))
    });
    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`, {headers: { accessToken: localStorage.getItem('accessToken')},
    }).then(() => {
            navigate("/");
        });
    };

  return (
    <div className='singlePostPage'> 
        <div className='postPageLeft'>
            <div className='post' id='single'>
                <div className='title'> {postObject.title} </div>
                <div className='body'> {postObject.postText} </div>
                <div className='footer'> {postObject.username}
                {authState.username} {authState.username === postObject.username && (
                    <button onClick={() => {deletePost(postObject.id)}}> Delete </button>
                )}
                </div>
            </div>
        </div>
        <div className='postPageRight'>
            <div className='commentAddContainer'>
                <input type='text' value={newComment} placeholder='Comment...' autoComplete='off' onChange={(event) => {setNewComment(event.target.value);}}/>
                <button onClick={addComment}> Comment </button>
            </div>
            <div className='commentsList'>
                {comments.map((comment, key) => {
                    return (
                        <div key={key} className='comment' > 
                            {comment.commentBody} 
                            <label>   |         |{comment.username} </label>
                            {authState.username === comment.username && (
                                <button onClick={() => deleteComment(comment.id)}> x </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
)
}

export default Post