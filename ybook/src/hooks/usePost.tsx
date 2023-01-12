import { useState } from "react"
import { usePostData } from "../providers/PostProvider";

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

  return {addLike, posts}
}

export default usePost;