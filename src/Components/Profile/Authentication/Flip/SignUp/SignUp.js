import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import './SignUp.css'
import Error from '../Error'


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email address')
        .max(30, 'Must be shorter than 255')
        .required('required'),
    password: Yup.string()
        .min(6, 'Must be more than 6 letters')
        .required('required'),
    name: Yup.string()
        .required('required'),
})

const SignUp = () => {

    const [error, setError] = React.useState('')

    const signUp = async (val) => {
        try {
            const data = await fetch('https://still-sands-43004.herokuapp.com/user/auth/signUp', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(val)
            })
            const fetchedData = await data.json()
            console.log(fetchedData);
        } catch (e) {
            setError(e)
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                signUp(values)
                resetForm()
                setSubmitting(false)
            }}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit }) => (
                    <form
                        className="modal-content"
                        onSubmit={handleSubmit}>
                        <div className="container">
                            <label htmlFor="text"><b>Name</b></label>
                            <input
                                id='name'
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={touched.name && errors.name ? 'has-error' : null} />
                            <Error touched={touched.name} message={errors.name} />

                            <label htmlFor="email"><b>Email</b></label>
                            <input
                                id='email'
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={touched.email && errors.email ? 'has-error' : null} />
                            <Error touched={touched.email} message={errors.email} />
                            <label htmlFor="password"><b>Password</b></label>
                            <input
                                id='password'
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={touched.password && errors.password ? 'has-error' : null} />
                            <Error touched={touched.password} message={errors.password} />
                            {error ? <p style={{ color: "red", fontSize: "15px" }}><strong>{error}</strong></p> : null}
                            <button type="submit">
                                Sign Up
                            </button>
                        </div>
                    </form>)}
        </Formik>
    )
}

export default SignUp