import { Button } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { values as objValues, propSatisfies, equals } from 'ramda'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { actions, selectMovies } from '../slice'

const urlRegExp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i
const dateRegExp = /^\d{2}\/\d{2}\/\d{4}$/i

function AddMovie() {
    const [imagePreview, setImagePreview] = useState()
    const isValidImagePreview = imagePreview && imagePreview !== 'invalid' && imagePreview !== 'error'
    const dispatch = useDispatch()
    const movies = useSelector(selectMovies)

    return (
        <Wrapper>
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
                    const anyError = !!objValues(errors).length
                    const anyTouched = !!objValues(touched).length
                    const submitIsDisabled = isSubmitting || anyError || !anyTouched

                    return (
                        <StyledForm>
                            <h2>Add a new movie:</h2>
                            <FormGroup>
                                <label htmlFor='title'>Title *</label>
                                <div>
                                    <Field type='text' name='title' id='title' />
                                    <ErrorMessage className='error' name='title' component='span' />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                {/* TODO: Use a date picker */}
                                <label htmlFor='release'>Release date (mm/dd/yyyy) *</label>
                                <div>
                                    <Field type='text' name='release' id='release' />
                                    <ErrorMessage className='error' name='release' component='span' />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                {/* inital version is using an url instead of a local file */}
                                {/* TODO: Check whether to use blob to let user pick files from local device? or any other technique? */}
                                <label htmlFor='image'>Image URL *</label>
                                <div>
                                    <Field type='url' name='image' id='image' />
                                    <span>Image preview: </span>
                                    <ErrorMessage className='error' name='image' component='span' />
                                    <div>
                                        {isValidImagePreview && <img width='210px' src={imagePreview} alt={values.title} />}
                                        {imagePreview === 'invalid' && <span className='error'>Image provided is invalid</span>}
                                        {imagePreview === 'error' && <span className='error'>Image didn't load due to an error</span>}
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor='description'>Description (max. characters: 300) *</label>
                                <div>
                                    <textarea rows={7} name='description' id='description' onChange={handleChange} onBlur={handleBlur} value={values.description} maxLength={300}></textarea>
                                    <span>Remaining: {300 - values.description.length} chars.</span>
                                    <ErrorMessage className='error' name='description' component='span' />
                                </div>
                            </FormGroup>
                            <Actions>
                                <StyledButton variant='outlined' color='inherit' type='submit' disabled={submitIsDisabled}>Save</StyledButton>
                                <Link to='/'><StyledButton variant='outlined' color='inherit' tabIndex='-1' role='none'>Cancel</StyledButton></Link>
                            </Actions>
                        </StyledForm>
                    )
                }}
            </Formik>
        </Wrapper>
    )
}

const StyledForm = styled(Form)`
    width: 50%;
    margin: 0 auto 20em;

    input, textarea {
        display: block;
        width: 100%;
        background-color: transparent;
        border: 1px solid #333;
        padding: 1em;
        color: white;
        font-size: inherit;
    }

    .error {
        display: inline-block;
        margin: 0 1em;
        font-size: 12px;
        font-weight: bold;
        color: red;
    }
`

const FormGroup = styled.div`
    display: flex;
    width: 100%;
    padding: 1em 0;

    label {
        width: 38%;
        padding-right: 3%;
    }

    > div {
        width: 62%;
    }
`

const Actions = styled.div`
    margin: 1em 0;
    text-align: right;
`

const StyledButton = styled(Button)`
    display: inline-block;
    color: var(--color-primary);
    margin: 0 1em;
    
    &[disabled] {
        color: var(--color-primary) !important;
        opacity: .62;
    }
`

const Wrapper = styled.div`
    padding: 1em;
    overflow-y: auto;
    --webkit-overflow-scrolling: touch;
`

export default AddMovie;
