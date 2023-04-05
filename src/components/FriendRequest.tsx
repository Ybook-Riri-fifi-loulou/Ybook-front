import React from 'react'
import { useFriendData } from '../providers/FriendProvider';
import SingleFriendshipRequest from './SingleFriendshipRequest';

interface FriendRequestProps {}

const FriendRequest : React.FC<FriendRequestProps> = () => {
  const {pendingFriendshipTo} = useFriendData();

  return (
    <div className='friend-items'>
      <p>Vous avez {pendingFriendshipTo?.length} demandes d'amis en attentes</p>
      {pendingFriendshipTo?.map((pendingFriendshipItem) => {
        return (
          <SingleFriendshipRequest key={pendingFriendshipItem.id} friend={pendingFriendshipItem ?? []} from={false} />
        )
      })}
    </div>
  )
}

export default FriendRequest