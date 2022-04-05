import React from 'react'
import { Moralis } from 'moralis';
const serverUrl = "https://obtz1utqtwxn.usemoralis.com:2053/server";
const appId = "BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj";
Moralis.start({ serverUrl, appId });

class Admin extends React.Component{
    async componentWillMount() {
        const list = []
        const a = await Moralis.Cloud.run("averageStars")
        console.log(a)
        for(let i = 0; i < a.length; i++){
            if(!(a[i].get("ethAddress")))
            continue
            console.log(a[i].get("name"))
            list.push(
            <div key={a[i].get("ethAddress")}>
            <span >{a[i].get("ethAddress")}</span>
            <button onClick=
            {(event) => {
                event.preventDefault()
                this.props.giveAccessToVote(a[i].get("ethAddress"))
            }}
            >Give Access to Vote</button><br/>
            </div>
            )
        }
        this.setState({ list: list })
        
    }
    constructor(props) {
        super(props)
        this.state = {
            list: [],

        }
    }
     render(){
        console.log(Moralis.User.current())
        
        return(
            <div>
                {this.state.list}
            </div>
        )
    }
}
export default Admin