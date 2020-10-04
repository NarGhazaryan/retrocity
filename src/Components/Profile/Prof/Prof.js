import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Card from '../../Cards/Card/Card'
import { Formik } from 'formik';
import * as Yup from 'yup'
import Error from '../Authentication/Flip/Error'
import "animate.css/animate.min.css";
import './Prof.css'

const Prof = (props) => {
    const prof = props.prof
    const [cards, setCards] = React.useState(props.posts)

    const addPost = async (value) => {
        try {
            const token = localStorage.getItem('token');
            await fetch('https://still-sands-43004.herokuapp.com/posts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(value)
            })
            value.userId = prof
            setCards([...cards, value])
        } catch (e) {
            console.log(e);
        }
    }

    const deleteEl = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const delData = await fetch(`https://still-sands-43004.herokuapp.com/posts/del/${id}`, {
                method: "DELETE",
                headers: {
                    'auth-token': token
                }
            })
            const del = await delData.json()
            console.log(del);
            const newState = cards.filter((card) => card._id !== id)
            setCards(newState)
        } catch (e) {
            console.log(e);
        }
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(15, 'Must be shorter than 15')
            .required('required'),
        imgUrl: Yup.string()
            .url("Must be an URL")
            .required('required'),
    })

    return (
        <div className="Prof">
            <div className="ProfSide">
                <h3 id='Name'> {prof.name} </h3>
                <h3 id='Email'>( {prof.email} )</h3>
            </div>
            <h3 id="Count"> Posts: {cards.length} </h3>
            {props.myProf._id === prof._id ? <h3 id="signOut" onClick={() => {
                localStorage.removeItem("token");
                props.profHandler()
            }}>Sign Out</h3> : null}

            <div className="PostSide">
                {cards.length === 0 ? <p style={{ margin: "auto" }}>You have no posts</p> : null}
                {cards.map((i, index) => (
                    <ScrollAnimation
                        animateIn={index % 3 === 0 ? "fadeInLeftBig" : index % 3 === 2 ? "fadeInRightBig" : "fadeIn"}
                        scrollableParentSelector='.PostSide'
                        animateOnce={true}
                        initiallyVisible={false}
                        key={index}
                    >
                        <Card delEl={deleteEl.bind(this, i._id)} imgUrl={i.imgUrl} title={i.title} by={i.userId.name} />
                    </ScrollAnimation>
                ))}
            </div>
            {
                props.myProf._id === prof._id ? (
                    <div className='addPost'>
                        <Formik
                            initialValues={{ title: "", imgUrl: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(true)
                                addPost(values)
                                resetForm()
                                setSubmitting(false)
                            }}>
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                                    <form
                                        className='addPostForm'
                                        onSubmit={handleSubmit}>
                                        <div className="addPostForm">
                                            <div>
                                                <label htmlFor="text"><b>Title:</b></label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    placeholder="Enter post title"
                                                    name="title"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.title}
                                                    className={touched.title && errors.title ? 'has-error' : null} />
                                                <Error touched={touched.title} message={errors.title} />
                                            </div>
                                            <div>
                                                <label htmlFor="url"><b>Image URL:</b></label>
                                                <input
                                                    id="imgUrl"
                                                    type="text"
                                                    placeholder="Enter image URL"
                                                    name="imgUrl"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.imgUrl}
                                                    className={`input ${touched.title && errors.title ? 'has-error' : null}`} />
                                                <Error touched={touched.imgUrl} message={errors.imgUrl} />
                                            </div>
                                            <button type="submit" className="addBtn">Add Post</button>
                                        </div>
                                    </form>
                                )}
                        </Formik>
                    </div>
                ) : null
            }
        </div >
    );
}

export default Prof;