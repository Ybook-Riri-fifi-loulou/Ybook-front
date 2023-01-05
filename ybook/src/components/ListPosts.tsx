import React, { useEffect, useState } from 'react'
import { User } from '../hooks/useAuth';
import Post from './SinglePost';

export interface ListPostsPage {}

export type Post = {
  createdAt: string;
  htmlContent: string;
  id: number;
  userId : number;
  user : User
}

const ListPosts : React.FC<ListPostsPage> = () => {
  const [posts, setPosts] = useState<Post[]|undefined>();

  useEffect(() => {
    fetch('http://localhost:3100/post/')
      .then(response => response.json())
      .then(res => setPosts(res))
      .catch(err => console.log(err))
  }, []);

  console.log(posts);

  return (
    <div>
      <h1>ListPosts</h1>
      <Post posts={posts ?? []} />
    </div>
  )
}

export default ListPosts