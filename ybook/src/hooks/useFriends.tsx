import React from 'react'
import { useFriendData } from '../providers/FriendProvider'
import { useGlobal } from '../providers/GlobalProvider';

const useFriends = () => {
  const {userInfo} = useGlobal();
  const {refetchFriends} = useFriendData();

  const deleteFriend = async (friendshipId: number) => {
    const response = await fetch(`http://localhost:3100/friendship/${friendshipId}`, {
      method: 'DELETE',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })

    if (response.status === 200 || response.status === 204) {
      await refetchFriends();
    } else {
      console.log('Something went wrong')
    }
  }

  return {deleteFriend}
}

export default useFriends