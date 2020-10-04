import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import './SignIn.css'
import Error from '../Error'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email address')
        .max(30, 'Must be shorter than 255')
        .required('required'),
    password: Yup.string()
        .min(6, 'Must be more than 6 letters')
        .required('required')
})

export default class SignIN extends React.Component {

    state = {
        error: ''
    }

    redir = this.props.profHandler.bind(this)

    async signIn(value) {
        try {
            const data = await fetch("https://still-sands-43004.herokuapp.com/user/auth/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value)
            })
            const fetchedData = await data.json()
            if (fetchedData.message) {
                this.setState({ error: fetchedData.message })
            } else {
                console.log(fetchedData);
                this.redir()
                localStorage.setItem('token', fetchedData.auth_token);
            }
        } catch (e) {
            this.setState({ error: "Something went wrong" })
        }
    }

    render() {
        return (
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    this.signIn(values)
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
                                <label htmlFor="email"><b>Email</b></label>
                                <input
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
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className={touched.password && errors.password ? 'has-error' : null} />
                                <Error touched={touched.password} message={errors.password} />
                                {this.state.error ? <p style={{ color: "red", fontSize: "15px" }}><strong>{this.state.error}</strong></p> : null}
                                <button type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    )}
            </Formik>
        );
    }
}
