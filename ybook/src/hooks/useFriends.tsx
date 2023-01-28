import React from 'react'
import { useFriendData } from '../providers/FriendProvider'
import { useGlobal } from '../providers/GlobalProvider';

const useFriends = () => {
  const {refetchFriends, refetchPendingFriendship} = useFriendData();
  const {userInfo} = useGlobal();

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

  const acceptFriendship = async (friendshipId: number) => {
    const response = await fetch(`http://localhost:3100/friendship/${friendshipId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })

    if (response.status === 200 || response.status === 204) {
      await refetchFriends();
      await refetchPendingFriendship();
    } else {
      console.log('Something went wrong')
    }
  }

  const refusedFriendship = async (friendshipId: number) => {
    const response = await fetch(`http://localhost:3100/friendship/${friendshipId}/refused`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })

    if (response.status === 200 || response.status === 204) {
      await refetchPendingFriendship();
    } else {
      console.log('Something went wrong')
    }
  }

  const addFriend = async (friendEmail : string) => {
    await fetch(`http://localhost:3100/friendship/${userInfo?.email}/${friendEmail}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })
  }

  return {deleteFriend, acceptFriendship, refusedFriendship, addFriend}
}

export default useFriends