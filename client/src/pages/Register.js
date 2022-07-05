import React from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const initialValues = {
        username: "",
        password: "",
    };
    let navigate = useNavigate();

//Yup used for form validation
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });
//posting register data
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
            navigate("/login");
        });

    };

    //form for registering
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label> Username </label>
                    <ErrorMessage name='username' component="span"/>
                    <Field
                        id="CreatePostinput"
                        name="username"
                    />
                    <label> Password </label>
                    <ErrorMessage name='password' component="span"/>
                    <Field
                        type="password"
                        id="CreatePostinput"
                        name="password"
                    />

                    <button type='submit'> Register </button>
                </Form>
            </Formik>
        </div>
  )
}

export default Register