import React from 'react';
import API from "../utils/API"


function SignOut() {

  const logout = () => {
    API.signOut()
      .then(() => window.location.href = "/")
      .catch(err => console.log(err));
  }  
    return (
      <div>
        {logout()}
      </div>
    )
}

export default SignOut;