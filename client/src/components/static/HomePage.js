import React from 'react'
//import welcomeGif from '/home/thyoon515/Development/code/phase-4/easy-sell-easy-buy/client/src/components/static/WelccomeToESEBgif.gif'
//import loggedInGif from '/home/thyoon515/Development/code/phase-4/easy-sell-easy-buy/client/src/components/static/ClickLinksgif.gif'

const HomePage = ({ currentUser }) => {

  if (currentUser) {
    return <div align='center' >
              <h1>Welcome, {currentUser.username}!</h1>
              {/* <img src={loggedInGif} alt='Click Links Gif' /> */}
           </div>
  } else {
    return <div>
              <h1>Please, Log In!</h1>
              {/* <img 
                src={welcomeGif} 
                alt='Welcome To ESEB' 
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
              /> */}
           </div>
  }
}

export default HomePage