import React, { useEffect, useState } from 'react'
import usePost from '../hooks/usePost';
import { usePostData } from '../providers/PostProvider';
import SinglePost from './SinglePost';

export interface ListPostsPage {}

const ListPosts : React.FC<ListPostsPage> = () => {
  const {posts} = usePostData();

  return (
    <div>
      <h1>ListPosts</h1>
      {posts?.map((post) => {
        return (
          <SinglePost key={post.id} post={post ?? []} />
        )
      })}
    </div>
  )
}

export default ListPosts