import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import { User } from "../hooks/useAuth";
import { useGlobal } from "./GlobalProvider";


export type FriendContextType = {
  friends: Friend[] | undefined;
  refetchFriends(): Promise<void>;
  pendingFriendship: Friend[] | undefined;
  refetchPendingFriendship(): Promise<void>;
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
  const [pendingFriendship, setPendingFriendship] = useState<Friend[]|undefined>();
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

  const refetchPendingFriendship = () =>
    fetch(`http://localhost:3100/friendship/${userInfo?.id}/pendingfriendship`, {
      method : "GET",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token_local")}`
      }
    })
    .then(response => response.json())
    .then(res => setPendingFriendship(res))
    .catch(err => console.log(err))
    useEffect(() => {
      refetchPendingFriendship()
    }, []);

  const friendData = {
    friends, refetchFriends, pendingFriendship, refetchPendingFriendship
  }

  return (
    <FriendContext.Provider value={friendData}>
      {children}
    </FriendContext.Provider>
  )
}

export const useFriendData = () => useContext(FriendContext)