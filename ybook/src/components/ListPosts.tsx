import React, { useEffect, useState } from 'react'
import { User } from '../hooks/useAuth';
import SinglePost from './SinglePost';

export interface ListPostsPage {}

export type Post = {
  createdAt: string;
  htmlContent: string;
  id: number;
  userId : number;
  user : User;
  postLikes : Like
}

export type Like = {
  userId : number
}

const ListPosts : React.FC<ListPostsPage> = () => {
  const [posts, setPosts] = useState<Post[]|undefined>();

  useEffect(() => {
    fetch('http://localhost:3100/post/')
      .then(response => response.json())
      .then(res => setPosts(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <h1>ListPosts</h1>
      <SinglePost posts={posts ?? []} setPosts={setPosts} />
    </div>
  )
}

export default ListPosts