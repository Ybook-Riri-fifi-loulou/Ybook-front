import { useState } from "react"
import { Post, usePostData } from "../providers/PostProvider";

const usePost = () => {
  const {posts, refetch} = usePostData();

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

    await refetch();
  }

  const checkIfPostIsLiked = (post : Post) : boolean => {
    let ret = false;
    const found = post.postLikes.find(like => like.userId === 17);
    if(found !== undefined) {
      ret = true;
    }
    return ret;
  }

  return {addLike, posts, checkIfPostIsLiked}
}

export default usePost;