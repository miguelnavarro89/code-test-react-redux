import { Formik, Form, Field, ErrorMessage } from 'formik'
import { values as objValues, propSatisfies, equals } from 'ramda'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions, selectMovies } from '../slice'

const urlRegExp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i
const dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/i

function AddMovie() {
    const [imagePreview, setImagePreview] = useState()
    const isValidImagePreview = imagePreview && imagePreview !== 'invalid' && imagePreview !== 'error'
    const dispatch = useDispatch()
    const movies = useSelector(selectMovies)

    return (
        <Formik
            initialValues={{
                title: '',
                release: '',
                image: '',
                description: '',
            }}
            validate={(values) => {
                return Object.keys(values).reduce((errors, key) => {
                    const value = values[key]
                    const message = (() => {
                        if (!value) {
                            return 'Required'
                        }
                        if (key === 'title') {
                            const anyExistingRecord = movies.find(propSatisfies(equals(value), 'title'))
                            if (anyExistingRecord) {
                                return 'Title already exists'
                            }
                        }
                        if (key === 'release') {
                            if (!dateRegExp.test(value)) {
                                return 'Invalid Date'
                            }
                            if (!new Date(value).getTime()) {
                                return 'Invalid Date'
                            }
                        }
                        if (key === 'image') {
                            if (!urlRegExp.test(value)) {
                                return 'Invalid URL'
                            }
                            const img = document.createElement('img')
                            img.onerror = () => setImagePreview('error')
                            img.oninvalid = () => setImagePreview('invalid')
                            img.onload = () => setImagePreview(value)
                            img.src = value
                        }
                        if (key === 'description') {
                            if (value.length > 300) {
                                return 'Max. characters reached'
                            }
                        }
                        return ''
                    })()
                    return { ...errors, ...(message ? { [key]: message } : {}) }
                }, {})
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                if (!isValidImagePreview) {
                    return setSubmitting(false)
                }
                
                dispatch(actions.add(values))
                resetForm()
                setSubmitting(false)
                setImagePreview('')
                alert(`New movie added: ${values.title}`)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
            }) => {
                const anyError = objValues(errors).length
                const anyTouched = objValues(touched).length
                const submitIsDisabled = isSubmitting || anyError || !anyTouched

                return (
                    <Form>
                        <h2>Add a new movie:</h2>
                        <div>
                            <label htmlFor='title'>Title *</label>
                            <Field type='text' name='title' id='title' />
                            <ErrorMessage name='title' component='div' />
                        </div>
                        <div>
                            {/* TODO: Use a date picker */}
                            <label htmlFor='release'>Release date (mm/dd/yyyy) *</label>
                            <Field type='text' name='release' id='release' />
                            <ErrorMessage name='release' component='div' />
                        </div>
                        <div>
                            {/* inital version is using an url instead of a local file */}
                            {/* TODO: Check whether to use blob to let user pick files from local device? or any other technique? */}
                            <label htmlFor='image'>Image URL *</label>
                            <Field type='url' name='image' id='image' />
                            <span>Image preview: </span>
                            {isValidImagePreview && <img width='210px' src={imagePreview} alt={values.title} />}
                            {imagePreview === 'invalid' && 'Image provided is invalid'}
                            {imagePreview === 'error' && 'Image didn\'t load due to an error'}
                            <ErrorMessage name='image' component='div' />
                            </div>
                        <div>
                            <label htmlFor='description'>Description (max. characters: 300) *</label>
                            <textarea name='description' id='description' onChange={handleChange} onBlur={handleBlur} value={values.description} maxLength={300}></textarea>
                            <span>Remaining: {300 - values.description.length} chars.</span>
                            <ErrorMessage name='description' component='div' />
                        </div>
                        <button type='submit' disabled={submitIsDisabled}>Save</button>
                        <Link to='/'><button tabIndex='-1' role='none'>Cancel</button></Link>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddMovie;
