import React, { useEffect, useState } from 'react'
import { Post } from './ListPosts'
import { FiThumbsUp } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RiShareForward2Line } from 'react-icons/ri'
import _ from 'lodash'

interface Props {
  posts: Post[];
  setPosts : any;
}

const SinglePost: React.FC<Props> = ({ posts, setPosts }) => {
  const addLike = async (postId: number) => {
    await fetch(`http://localhost:3100/postLikes`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: 17,
        postId
      })
    })

    fetch('http://localhost:3100/post/')
      .then(response => response.json())
      .then(res => setPosts(res))
      .catch(err => console.log(err))
  }

  const triggerComments = () => { }
  const triggerShare = () => { }

  return (
    <div>
      {posts?.map((post) => {
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
                  <FiThumbsUp className='post-footer__likes-icon' />
                  <span className='post-footer__likes-count'>{Object.keys(post.postLikes).length}</span>
                </Link>
              </div>
              <div className="post-footer__comments">
                <Link to='#' onClick={triggerComments}>
                  <FaRegComment className='post-footer__comments-icon' />
                  <span className='post-footer__comments-count'>13</span>
                </Link>
              </div>
              <div className="post-footer__share">
                <Link to="#" onClick={triggerShare}>
                  <RiShareForward2Line className='post-footer__share-icon' />
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SinglePost