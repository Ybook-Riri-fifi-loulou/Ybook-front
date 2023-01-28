import React from 'react'
import { useFriendData } from '../providers/FriendProvider';
import SingleFriendshipRequest from './SingleFriendshipRequest';

interface FriendRequestProps {}

const FriendRequest : React.FC<FriendRequestProps> = () => {
  const {pendingFriendship} = useFriendData();

  return (
    <div className='friend-items'>
      <p>Vous avez {pendingFriendship?.length} demandes d'amis en attentes</p>
      {pendingFriendship?.map((pendingFriendshipItem) => {
        return (
          <SingleFriendshipRequest key={pendingFriendshipItem.id} friend={pendingFriendshipItem ?? []} />
        )
      })}
    </div>
  )
}

export default FriendRequest