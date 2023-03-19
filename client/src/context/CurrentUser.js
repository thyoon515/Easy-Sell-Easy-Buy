import React, { createContext, useState } from "react";

const CurrentUserContext = createContext()

function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({})

    console.log(currentUser)

    const value = [currentUser, setCurrentUser]

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export { CurrentUserContext, CurrentUserProvider }