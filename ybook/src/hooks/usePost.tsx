import { useState } from "react"
import { useGlobal } from "../providers/GlobalProvider";
import { Post, usePostData } from "../providers/PostProvider";

const usePost = () => {
  const {posts, refetch} = usePostData();
  const {userInfo} = useGlobal();

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
  }

  const checkIfPostIsLiked = (post : Post) : boolean => {
    let ret = false;
    const found = post.postLikes.find(like => like.userId === userInfo?.id);
    if(found !== undefined) {
      ret = true;
    }
    return ret;
  }

  return {addLike, posts, checkIfPostIsLiked, addComment}
}

export default usePost;