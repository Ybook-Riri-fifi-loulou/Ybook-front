import React, { SyntheticEvent, useState } from 'react'
import useFriends from '../hooks/useFriends';
import { useFriendData } from '../providers/FriendProvider';
import { useGlobal } from '../providers/GlobalProvider'
import SingleFriendshipRequest from './SingleFriendshipRequest';

const AddFriend = () => {
  const {pendingFriendshipFrom} = useFriendData();
  const {addFriend} = useFriends();
  const [email, setEmail] = useState('');
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFriend(email);
    setEmail('');
  }

  return (
    <>
      <div className='add-friend'>
        <span>Ajouter un ami</span>
        <form className='row g-3' onSubmit={handleSubmit}>
          <div className="col-9">
            <input type="text" className='form-control' onChange={(e) => setEmail(e.currentTarget.value)} value={email} required/>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Ajouter</button>
          </div>
        </form>
      </div>
      <div className='friend-items'>
        {pendingFriendshipFrom?.length ?
          <p>Vos demandes d'amis</p> : ''
        }
        {pendingFriendshipFrom?.map((pendingFriendshipItem) => {
          return (
            <SingleFriendshipRequest key={pendingFriendshipItem.id} friend={pendingFriendshipItem ?? []} from={true} />
          )
        })}
    </div>
    </>
  )
}

export default AddFriend