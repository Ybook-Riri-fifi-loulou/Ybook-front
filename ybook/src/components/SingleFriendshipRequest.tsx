import React, { useState, useEffect } from 'react'
import { Friend } from '../providers/FriendProvider';
import { RiCloseCircleFill, RiAddCircleFill } from 'react-icons/ri';
import useFriends from '../hooks/useFriends';

interface Props {
  friend: Friend;
  from: boolean;
}

const SingleFriendshipRequest : React.FC<Props> = ({ friend, from }) => {
  const {acceptFriendship, refusedFriendship} = useFriends();

  return (
    <div className='friend-item' key={friend.id} id={`${friend.id}`}>
      <img src="https://i.pravatar.cc/36" alt="" className='friend-item__avatar img-fluid' width={36} height={36} loading="lazy" />
      <div className="friend-item__content">
        <span className='friend-item__name'>
          {!from ?
          `${friend.from['firstname']} ${friend.from['lastname']}` :
          `${friend.to['firstname']} ${friend.to['lastname']}`
          }
          </span>
        <span className='friend-item__date'>Demande envoyée le {new Intl.DateTimeFormat('fr', { dateStyle: 'medium' }).format(new Date(friend.createdAt))}</span>
      </div>
      {!from &&
        <div className="friend-item__accept-or-deny">
          <button className='friend-item__actions-button' onClick={() => acceptFriendship(friend.id)}><RiAddCircleFill className='friend-item__actions-button--accept' /></button>
          <button className='friend-item__actions-button' onClick={() => refusedFriendship(friend.id)}><RiCloseCircleFill className='friend-item__actions-button--deny' /></button>
        </div>
      }
    </div>
  )
}

export default SingleFriendshipRequest