import React, { SyntheticEvent, useState, useEffect } from 'react'
import usePost from '../hooks/usePost';
import useProfil from '../hooks/useProfil';
import noPicture from '../assets/images/no-avatar.png'
import { useGlobal } from '../providers/GlobalProvider';

export interface AddPostsProps {}

const AddPosts: React.FC<AddPostsProps> = () => {
    const [message, setMessage] = useState('');
    const {addPost} = usePost();
    const {userInfo} = useGlobal();
    const {getSignedUrlGet, setAvatar, avatar} = useProfil();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        addPost(message);
        setMessage('');
    }

    useEffect(() => {
        if(userInfo?.avatarS3Key !== null) {
          getSignedUrlGet(userInfo?.avatarS3Key);
          setAvatar(avatar);
        } else {
          setAvatar(noPicture);
        }
      }, [])

    return (
        <div className="add-post">
            <div className="add-post__container">
                <h2>Publication rapide</h2>
                <form className="add-post__form" onSubmit={handleSubmit}>
                    <img src={avatar!} alt="user-avatar" className='add-post__avatar img-fluid rounded-circle' width={48} height={48} loading='lazy'/>
                    <div>
                        <textarea className="addpost-form__input form-control" name="message" id="message" onChange={(e) => setMessage(e.currentTarget.value)} value={message} required></textarea>
                        <button type='submit' className='btn btn-primary addpost-form__submit'>Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPosts