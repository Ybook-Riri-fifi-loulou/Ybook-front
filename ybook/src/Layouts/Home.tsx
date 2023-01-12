import React from 'react'
import ListPosts from '../components/ListPosts'
import { useGlobal } from '../providers/GlobalProvider'
import { PostProvider } from '../providers/PostProvider';

const Home : React.FC = () => {
  const data = useGlobal();
  console.log(data);

  return (
    <div className='homepage'>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-9">
            <PostProvider>
              <ListPosts />
            </PostProvider>
          </div>
          <div className="d-none d-lg-block col-lg-3">
            friends
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

