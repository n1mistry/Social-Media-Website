import React, {useContext, useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import {AuthContext} from "../helpers/AuthContext";
    

function CreatePost() {
    const { authState } = useContext(AuthContext); 

    let navigate = useNavigate(); 

    const initialValues = {
        title: "",
        postText: "",
    };

    useEffect(() => {
        if (!authState.status) {
            navigate("/login");
        }
    }, []);
//Yup used for form validation
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    })
//posting the post in database
    const onSubmit =(data) => {

        axios.post("http://localhost:3001/posts", data, { headers: {accessToken: localStorage.getItem('accessToken') } } ).then((response) => {
            navigate("/");
        });    }


    //Create Post Form 
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label> Title </label>
                <ErrorMessage name='title' component="span"/>
                <Field
                    id="CreatePostinput"
                    name="title"
                    placeholder="What is the subject"
                />
                <label> Post </label>
                <ErrorMessage name='poseText' component="span"/>
                <Field
                    id="CreatePostinput"
                    name="postText"
                    placeholder="Thoughts"
                />
                

                <button type='submit'> Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost