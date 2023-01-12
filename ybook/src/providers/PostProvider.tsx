import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import { User } from "../hooks/useAuth";


export type PostContextType = {
  posts: Post[] | undefined;
  refetch(): Promise<void>
}

export type Post = {
  createdAt: string;
  htmlContent: string;
  id: number;
  userId : number;
  user : User;
  postLikes : Like[];
  postComments : any;
}

export type Like = {
  userId : number
}

export type Comment = {
  id : number;
  text : string;
  userId : number;
  user: User;
}

const PostContext = createContext<PostContextType>(null!);

export const PostProvider = ({ children } : PropsWithChildren<unknown>) => {
  const [posts, setPosts] = useState<Post[]|undefined>();


  const refetch = () =>
    fetch('http://localhost:3100/post/')
    .then(response => response.json())
    .then(res => setPosts(res))
    .catch(err => console.log(err))
    useEffect(() => {
      refetch()
    }, []);

  const postData = {
    posts, refetch
  }

  return (
    <PostContext.Provider value={postData}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostData = () => useContext(PostContext)