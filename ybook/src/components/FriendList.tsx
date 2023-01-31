import React from 'react'
import { useFriendData } from '../providers/FriendProvider';
import SingleFriend from './SingleFriend';

interface FriendListProps {}

const FriendList : React.FC<FriendListProps> = () => {
  const {friends} = useFriendData();

  return (
    <div className='friend-items'>
      <p>Vous avez {friends?.length} amis</p>
      {friends?.map((friend) => {
        return (
          <SingleFriend key={friend.id} friend={friend ?? []} />
        )
      })}
    </div>
  )
}

export default FriendList