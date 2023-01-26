import React, { SyntheticEvent, useState } from 'react'

export interface AddPostsProps {}

const AddPosts: React.FC<AddPostsProps> = () => {
    const [message, setMessage] = useState('')
    const [userId, setUserId] = useState(0)

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token_local")}`
            },
            body: JSON.stringify({ htmlContent: message, userId: userId})
        }

        fetch('http://localhost:3100/post', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    return (
        <div className="addposts mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-9 col-md-7 col-lg-6">
                        <h1>Publier</h1>
                        <form className="addpost-form" onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="message" className="addpost-form__label form-label">Message</label>
                                <textarea className="addpost-form__input form-control" name="message" id="message" onChange={(e) => setMessage(e.currentTarget.value)} value={message} required></textarea>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="userId" className="addpost-form__label form-label">User ID</label>
                                <input type="number" className="addpost-form__input form-control" name="userId" id="userId" required onChange={(e) => setUserId(e.currentTarget.valueAsNumber)} value={userId}/>
                            </div>
                            <div className='mb-3'>
                            <button type='submit' className='btn btn-primary addpost-form__submit'>Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPosts