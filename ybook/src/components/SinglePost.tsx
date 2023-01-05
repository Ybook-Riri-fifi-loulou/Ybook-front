import React, { useState } from 'react'
import { Post } from './ListPosts';

interface Props {
  posts: Post[];
}

const SinglePost : React.FC<Props> = ({posts}) => {
  return (
    <div>
      {posts?.map((post) => {
        return (
          <div className='post'>
            <div className="post-header">
              <img src="https://i.pravatar.cc/48" alt="" className='post-header__image' width={48} height={48} loading="lazy"/>
              <div className='post-header__content'>
                <span className='post-header__title'>{post.user['firstname']} {post.user['lastname']}</span>
                <span className='post-header__date'>Posté le {new Intl.DateTimeFormat('fr', {dateStyle: 'medium'}).format(new Date(post.createdAt))}</span>
              </div>
            </div>
            <div className='post-content'>
              <p className='post-content__text'>{post.htmlContent}</p>
              <img src="https://via.placeholder.com/300x200" alt="" className='post-content__image' loading='lazy'/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SinglePost