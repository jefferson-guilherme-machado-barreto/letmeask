import { createContext, ReactNode, useState, useEffect } from 'react'
import { auth, firebase } from '../services/firebase'


type AuthContextType = {
    user: user | undefined,
    signInWithGoogle: () => Promise<void>
}

type user = {
    id: string,
    name: string,
    avatar: string
}

type AuthContextProviderProps = {
    children: ReactNode
}
  
export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<user>()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const {
            displayName,
            photoURL,
            uid
          } = user
    
          if (!displayName || !photoURL) {
            throw new Error('Missing information from google Account.')
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
  
      return () => {
        unsubscribe()
      }
    }, [])
  
    const signInWithGoogle = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
  
      const result = await auth.signInWithPopup(provider)
  
      if (result.user) {
        const {
          displayName,
          photoURL,
          uid
        } = result.user
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information from google Account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }
  

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}