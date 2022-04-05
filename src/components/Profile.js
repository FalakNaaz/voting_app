import { Moralis } from 'moralis';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Profile extends React.Component{

    constructor(props) {
        super(props);
        const user = Moralis.User.current();
        console.log(user);
      }

      render(){
          return(
              <div>Hello Bunny!!</div>
          );
      }

}

export default Profile;