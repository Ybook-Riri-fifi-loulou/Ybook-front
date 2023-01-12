import React, { useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import { FaRegComment, FaThumbsUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RiShareForward2Line } from 'react-icons/ri'
import usePost from '../hooks/usePost'
import { Post, Comment } from '../providers/PostProvider'

interface Props {
  post: Post;
  setPosts ?: any;
}

const SinglePost: React.FC<Props> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const { addLike, checkIfPostIsLiked } = usePost();
  const triggerShare = () => { }

  return (
    <div className='post' key={post.id} id={`${post.id}`}>
      <div className="post-header">
        <img src="https://i.pravatar.cc/48" alt="" className='post-header__image' width={48} height={48} loading="lazy" />
        <div className='post-header__content'>
          <span className='post-header__title'>{post.user['firstname']} {post.user['lastname']}</span>
          <span className='post-header__date'>Posté le {new Intl.DateTimeFormat('fr', { dateStyle: 'medium' }).format(new Date(post.createdAt))}</span>
        </div>
      </div>
      <div className='post-content'>
        <p className='post-content__text'>{post.htmlContent}</p>
        <img src="https://res.cloudinary.com/drxtvqede/image/upload/v1672993634/dog_d70r0m.jpg" alt="" className='post-content__image img-fluid' loading='lazy' />
      </div>
      <div className="post-footer">
        <div className="post-footer__likes">
          <Link to='#' onClick={() => addLike(post.id)}>
            {checkIfPostIsLiked(post) ?
              <FaThumbsUp className='post-footer__likes-icon' />
              :
              <FiThumbsUp className='post-footer__likes-icon' />
            }
            <span className='post-footer__likes-count'>{Object.keys(post.postLikes).length}</span>
          </Link>
        </div>
        <div className="post-footer__comments">
          <Link to='#' onClick={() => setShowComments(!showComments)}>
            <FaRegComment className='post-footer__comments-icon' />
            <span className='post-footer__comments-count'>{Object.keys(post.postComments).length}</span>
          </Link>
        </div>
        <div className="post-footer__share">
          <Link to="#" onClick={triggerShare}>
            <RiShareForward2Line className='post-footer__share-icon' />
          </Link>
        </div>
      </div>
      {showComments ?
        <div className='post-comment-section'>
          {(post.postComments).map((comment : Comment) => {
            return (
              <div className='post-comment-section__item' key={comment.id}>
                <div className="post-comment-section__item-header">
                  <img src="https://i.pravatar.cc/36" alt="" className='post-header__image' width={36} height={36} loading="lazy" />
                  <span>{comment.user['firstname'] +  comment.user['lastname']}</span>
                </div>
                <p>{comment.text}</p>
              </div>
            )
          })}
        </div> : ''
      }
    </div>
  )
}

export default SinglePost