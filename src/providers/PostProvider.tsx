import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import { User } from "../hooks/useAuth";
import {useGlobal} from "./GlobalProvider";


export type PostContextType = {
  posts: Post[] | undefined;
  userPosts: Post[] | undefined;
  likedPosts: Post[] | undefined;
  refetch(): Promise<void>;
  getLikedPosts(): Promise<void>;
  getProfilPosts(): Promise<void>;
}

export type Post = {
  createdAt: string;
  htmlContent: string;
  id: number;
  userId : number;
  user : User;
  postLikes : Like[];
  postComments : Comment[];
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
  const [userPosts, setUserPosts] = useState<Post[]|undefined>();
  const [likedPosts, setLikedPosts] = useState<Post[]|undefined>();
  const {userInfo} = useGlobal();

  const getProfilPosts = () =>
    fetch(`http://localhost:3100/post/${userInfo?.id}/posts`, {
      method : "GET",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })
    .then(response => response.json())
    .then(res => setUserPosts(res))
    .catch(err => console.log(err))

  const getLikedPosts = () =>
      fetch(`http://localhost:3100/post/${userInfo?.id}/likes`, {
        method : "GET",
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token_local")}`
        }
      })
      .then(response => response.json())
      .then(res => setLikedPosts(res))
      .catch(err => console.log(err))

  const refetch = () =>
    fetch('http://localhost:3100/post/', {
      method : "GET",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })
    .then(response => response.json())
    .then(res => setPosts(res))
    .catch(err => console.log(err))


    useEffect(() => {
      refetch()
      getProfilPosts()
      getLikedPosts()
      getProfilPosts()
    }, []);



  const postData = {
    posts, userPosts, likedPosts, refetch, getLikedPosts, getProfilPosts
  }

  return (
    <PostContext.Provider value={postData}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostData = () => useContext(PostContext)