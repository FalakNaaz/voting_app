import React from 'react'
import { Moralis } from 'moralis';
import '../static/css/Styles.css';
import PopUp from "./PopUp";
const serverUrl = "https://obtz1utqtwxn.usemoralis.com:2053/server";
const appId = "BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj";

Moralis.start({ serverUrl, appId });

class Admin extends React.Component {
    togglePop = (ethaddress,name,gender, email, address, region, adhar) => {

        this.setState({
            ethAddress: ethaddress,
            uname:name,
            gender:gender,
            email:email,
            address:address,
            region:region,
            adhar:adhar
         });
        console.log("hello")
        this.setState({
            seen: !this.state.seen
        });
        
    };

    async componentWillMount() {
        const list = []
        const a = await Moralis.Cloud.run("averageStars")
        this.setState({a:a})
        console.log("this is the list of users",a)
        for (let i = 0; i < a.length; i++) {
            if (!(a[i].get("ethAddress")))
                continue
            list.push(
                <div key={a[i].get("ethAddress")}>
                    <span >{a[i].get("ethAddress")}</span>
                    <button onClick=
                        {(event) => {
                            event.preventDefault()
                            this.props.giveAccessToVote(a[i].get("ethAddress"))
                        }}
                    >Give Access to Vote</button><br />

                    <button onClick={() => this.togglePop(a[i].get("ethAddress"), a[i].get("name"),
                     a[i].get("gender"),  a[i].get("email"),  a[i].get("address"),  a[i].get("region"),  a[i].get("adhar")
                    )}>View Info</button>


                </div>
            )
        }
        this.setState({ list: list })

    }
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            seen: false,
            uname: "",
            ethAddress: "",
            gender:"",
            email:"",
            adhar:"",
            address:"",
            region:""

        }
    }
    render() {
        console.log(Moralis.User.current())

        return (
            <div>
                {this.state.list}
                
                {this.state.seen ? (
                    <PopUp toggle={this.togglePop} ethaddress={this.state.ethAddress} name={this.state.uname} gender={this.state.gender} email={this.state.email} adhar={this.state.adhar} address={this.state.address} region={this.state.region}/>
                ) : null}
            </div>
        )
    }
}
export default Admin