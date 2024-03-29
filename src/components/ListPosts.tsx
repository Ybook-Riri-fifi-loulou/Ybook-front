import React from 'react'
import {Post, usePostData} from '../providers/PostProvider';
import SinglePost from './SinglePost';

export interface ListPostsPage {
    whichposts: string;
}

const ListPosts : React.FC<ListPostsPage> = (userpost) => {
  const {posts, userPosts, likedPosts} = usePostData();
  let listPosts: Post[] = [];

  if (userpost.whichposts === "myPosts") {
      if (userPosts !== undefined)
      {
            listPosts = userPosts;
      }
  } else if (userpost.whichposts === "likedPosts") {
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
      {listPosts.length > 0 ?
        listPosts?.map((post) => {
          return (
            <SinglePost key={post.id} post={post ?? []} />
          )
        }) :
       <p className='text-center'>Il n'y a pas de publications disponible</p>
       }
    </div>
  )
}

export default ListPosts