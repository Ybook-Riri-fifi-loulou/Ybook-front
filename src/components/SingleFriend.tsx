import React, { useState } from 'react'
import { Friend } from '../providers/FriendProvider';
import { useGlobal } from '../providers/GlobalProvider';
import { BsThreeDotsVertical, BsTrashFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import useFriends from '../hooks/useFriends';

interface Props {
  friend: Friend;
}

const SingleFriend : React.FC<Props> = ({ friend }) => {
  const {userInfo} = useGlobal();
  const {deleteFriend} = useFriends();
  const [userActions, setUserActions] = useState(false);
  const toggleUserAction = () => {
    setUserActions(!userActions);
  }

  return (
    <div className='friend-item' key={friend.id} id={`${friend.id}`}>
      <img src="https://i.pravatar.cc/36" alt="" className='friend-item__avatar img-fluid' width={36} height={36} loading="lazy" />
      <div className="friend-item__content">
        <span className='friend-item__name'>
          {friend.to['id'] !== userInfo?.id ?
            `${friend.to['firstname']} ${friend.to['lastname']}` :
            `${friend.from['firstname']} ${friend.from['lastname']}`
          }
        </span>
        <span className='friend-item__date'>Depuis le {new Intl.DateTimeFormat('fr', { dateStyle: 'medium' }).format(new Date(friend.createdAt))}</span>
      </div>
      <span className='friend-item__button' onClick={() => toggleUserAction()}><BsThreeDotsVertical className='friend-item__button-icon' /></span>
      {userActions && (
        <div className='friend-item__actions'>
          <button className='friend-item__actions-button' onClick={() => alert(friend.to['id'])}>Ecrire un message <FiSend className='friend-item__actions-button--send' /></button>
          <button className='friend-item__actions-button' onClick={() => deleteFriend(friend.id)}>Supprimer l'ami <BsTrashFill className='friend-item__actions-button--trash' /></button>
        </div>
      )}
    </div>
  )
}

export default SingleFriend