import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import { User } from "../hooks/useAuth";


export type FriendContextType = {
  friends: Friend[] | undefined;
  refetchFriends(): Promise<void>
}

export type Friend = {

}

const FriendContext = createContext<FriendContextType>(null!);

export const FriendProvider = ({ children } : PropsWithChildren<unknown>) => {
  const [friends, setFriends] = useState<Friend[]|undefined>();


  const refetchFriends = () =>
    fetch('http://localhost:3100/post/', {
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

  const friendData = {
    friends, refetchFriends
  }

  return (
    <FriendContext.Provider value={friendData}>
      {children}
    </FriendContext.Provider>
  )
}

export const useFriendData = () => useContext(FriendContext)