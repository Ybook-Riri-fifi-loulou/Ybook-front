import React from 'react'
import {Post, usePostData} from '../providers/PostProvider';
import SinglePost from './SinglePost';

export interface ListPostsPage {
    userposts: string;
}

const ListPosts : React.FC<ListPostsPage> = (userpost) => {
  const {posts, userPosts, likedPosts} = usePostData();
  let listPosts: Post[] = [];

  if (userpost.userposts === "myPosts") {
      if (userPosts !== undefined)
      {
            listPosts = userPosts;
      }
  } else if (userpost.userposts === "likedPosts") {
        if (likedPosts !== undefined)
        {
                listPosts = likedPosts;
        }
  } else {
        if (posts !== undefined)
        {
                listPosts = posts;
        }
  }

  return (
    <div>
      {listPosts?.map((post) => {
        return (
          <SinglePost key={post.id} post={post ?? []} />
        )
      })}
    </div>
  )
}

export default ListPosts