import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FriendList from '../components/FriendList'
import { FriendProvider } from '../providers/FriendProvider'

interface FriendsPageProps {}

const Friends : React.FC<FriendsPageProps> = () =>  {
  return (
    <div className='friends'>
      <div className="container">
        <h1 className='friends-title section-title'>Amis</h1>
        <Tabs defaultActiveKey="friendList" id='friends-tab' className='friends-tab'>
          <Tab eventKey="friendList" title="Mes amis" className='friends-tab__item'>
            <FriendProvider>
              <FriendList />
            </FriendProvider>
          </Tab>
          <Tab eventKey='addFriend' title='Ajouter' className='friends-tab__item'>
            <p>Je suis l'ajout d'amis</p>
          </Tab>
          <Tab eventKey='friends' title='Demande' className='friends-tab__item'>
            <p>Je suis les requetes des amis</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default Friends