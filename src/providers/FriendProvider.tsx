import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import { User } from "../hooks/useAuth";
import { useGlobal } from "./GlobalProvider";


export type FriendContextType = {
  friends: Friend[] | undefined;
  refetchFriends(): Promise<void>;
  pendingFriendshipTo: Friend[] | undefined;
  refetchPendingFriendshipTo(): Promise<void>;
  pendingFriendshipFrom: Friend[] | undefined;
  refetchPendingFriendshipFrom(): Promise<void>;
}

export type Friend = {
  id: number;
  status: string;
  to: User;
  from: User;
  createdAt: Date
}

const FriendContext = createContext<FriendContextType>(null!);

export const FriendProvider = ({ children } : PropsWithChildren<unknown>) => {
  const [friends, setFriends] = useState<Friend[]|undefined>();
  const [pendingFriendshipTo, setPendingFriendshipTo] = useState<Friend[]|undefined>();
  const [pendingFriendshipFrom, setPendingFriendshipFrom] = useState<Friend[]|undefined>();
  const {userInfo} = useGlobal();

  const refetchFriends = () =>
    fetch(`http://localhost:3100/friendship/${userInfo?.id}/friends`, {
      method : "GET",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })
    .then(response => response.json())
    .then(res => setFriends(res))
    .catch(err => console.log(err))
    useEffect(() => {
      refetchFriends()
    }, []);

  const refetchPendingFriendshipTo = () =>
    fetch(`http://localhost:3100/friendship/${userInfo?.id}/pendingfriendshipTo`, {
      method : "GET",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })
    .then(response => response.json())
    .then(res => setPendingFriendshipTo(res))
    .catch(err => console.log(err))
    useEffect(() => {
      refetchPendingFriendshipTo()
    }, []);

    const refetchPendingFriendshipFrom = () =>
      fetch(`http://localhost:3100/friendship/${userInfo?.id}/pendingfriendshipFrom`, {
        method : "GET",
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token_local")}`
        }
      })
      .then(response => response.json())
      .then(res => setPendingFriendshipFrom(res))
      .catch(err => console.log(err))
      useEffect(() => {
        refetchPendingFriendshipFrom()
      }, []);

  const friendData = {
    friends, refetchFriends, pendingFriendshipTo, refetchPendingFriendshipTo, pendingFriendshipFrom, refetchPendingFriendshipFrom
  }

  return (
    <FriendContext.Provider value={friendData}>
      {children}
    </FriendContext.Provider>
  )
}

export const useFriendData = () => useContext(FriendContext)