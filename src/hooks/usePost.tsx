import { useState } from "react"
import { useGlobal } from "../providers/GlobalProvider";
import { Post, usePostData } from "../providers/PostProvider";

const usePost = () => {
  const {posts, refetch, getLikedPosts, getProfilPosts} = usePostData();
  const {userInfo} = useGlobal();

  const addPost = async (message: string) => {
    const response = await fetch('http://localhost:3100/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      },
      body: JSON.stringify({
        htmlContent: message,
        userId: userInfo?.id
      })
    })

    if (response.status === 200 || response.status === 204) {
      await refetch();
    } else {
      console.log('error')
    }

    // await getProfilPosts();
  }

  const addLike = async (postId: number) => {
    await fetch(`http://localhost:3100/postLikes`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      },
      body: JSON.stringify({
        userId: userInfo?.id,
        postId
      })
    })

    await refetch();
    await getLikedPosts();
    await getProfilPosts();
  }

  const addComment = async (htmlContent: string, postId: number) => {
    await fetch('http://localhost:3100/postComments', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      },
      body: JSON.stringify({
        htmlContent,
        userId: userInfo?.id,
        postId
      })
    })

    await refetch();
    await getLikedPosts();
    await getProfilPosts();
  }

  const checkIfPostIsLiked = (post : Post) : boolean => {
    let ret = false;
    const found = post.postLikes.find(like => like.userId === userInfo?.id);
    if(found !== undefined) {
      ret = true;
    }
    return ret;
  }

  const getUserPosts = (userId: number) => {
    const userPosts = posts?.filter(post => post.userId === userId);
    return userPosts;
  }

  return {addLike, posts, checkIfPostIsLiked, addComment, getUserPosts, addPost}
}

export default usePost;