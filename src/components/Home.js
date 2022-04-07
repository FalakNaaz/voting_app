import React, { Component } from 'react'
import Admin from './Admin'
import Web3 from 'web3'
import Ballot from '../truffle_abis/Ballot.json'
import Main from './Main.js';
import Nav from "./Nav";
import PopUpChart from "./PopUpChart.js"

import PopUpReg from "./PopUpReg";
import { Moralis } from 'moralis';
import { Navigate,Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
const serverUrl = "https://obtz1utqtwxn.usemoralis.com:2053/server";
const appId = "BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj";
Moralis.start({ serverUrl, appId });

class Home extends React.Component {
    togglePop = () => {
        console.log("hello")
        this.setState({
            seen: !this.state.seen
        });
       
    };

    togglePopReg = () => {
        console.log("hello")
        this.setState({
            seenReg: !this.state.seenReg
        });
       
    };

    async logOut() {

        //console.log(Moralis.User.current())
         await Moralis.User.logOut();
        this.setState({counter:1});  
            
    }
    async buttonClick() {
        
        let res = await this.state.ballot.methods.chairperson().call();
        console.log("res = ",res)
        console.log("this.state.account = ",this.state.account)
        if(this.state.account != res){
            alert('Only Chairperson Can Access This Page!')
            return
        }


        
        this.setState({buttonClicked: true})
      }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            alert('No ethereum browser found! you can check metamask!')
        }
    }
    async loadBlockchainData() {
        const ethers = require('ethers');
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({ account: account[0] })
        const networkId = await web3.eth.net.getId()
        const ballotData = Ballot.networks[networkId]
        let ballot
        if (ballotData) {
            let temp = []
            ballot = new web3.eth.Contract(Ballot.abi, ballotData.address)
            
            this.setState({ ballot: ballot })

            let l = await this.state.ballot.methods.cLength().call();
            for (let i = 0; i < l; i++) {
                let namee = await this.state.ballot.methods.candidates(i).call();
                namee = ethers.utils.parseBytes32String(namee.name)
                //console.log(namee.name)
                temp[i] = namee

            }
            this.setState({ candidateNames: temp })
        } else {
            window.alert('Error! tether contract not deployed - no detected network!')
        }

        this.setState({ loading: false })

    }
    voteFunction = (candidate) => {
        const user = Moralis.User.current()
        const gender = user.get("gender")
        this.setState({ loading: true })
        this.state.ballot.methods.vote(candidate,gender).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
        })
    }
    winningCandidateName = async () => {
        const ethers = require('ethers');
        let res = await this.state.ballot.methods.winningCandidateName().call();
        res = ethers.utils.parseBytes32String(res)
        console.log("The winner is: ", res)
        this.setState({ res: res.toString() })
    }
    giveAccessToVote = async(account) => {
        this.setState({loading: true})
        this.state.ballot.methods.giveAccessToVote(account).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }

    togglePop = async() => {
        let m = await this.state.ballot.methods.candidates(1).call();
        let f = await this.state.ballot.methods.candidates(1).call();
        //console.log("hello",m,f)
        this.setState({
            seen: !this.state.seen,
            maleCounter: m.maleCount,
            femaleCounter: f.femaleCount
        });
        
    };

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            ballot: {},
            res: '0',
            loading: true,
            candidateNames: [],
            counter: 0,
            buttonClicked: false,
            seen: false,
            maleCounter: 0,
            femaleCounter: 0,
            seenReg:false


        }

        this.logOut = this.logOut.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    render() {
        
        let content,adminPage
        {
           
            this.state.loading ?
            content = <p id='loader' className='text-center' style={{ margin: '30px' }}>Loading...</p> :
            content =
            <Main
                res={this.state.res}
                voteFunction={this.voteFunction}
                winningCandidateName={this.winningCandidateName}
                candidateNames={this.state.candidateNames}
                //ballot = {this.state.ballot}
                counter={this.state.counter}

            />
            
        }
        
        this.state.buttonClicked ? content = <Admin giveAccessToVote = {this.giveAccessToVote} /> : content = content
            
        return (

            
            <section className='wrapper'>


<div>
        <div className="wrapper-head">

            <p className="account">ACCOUNT NUMBER: <span className="account-num">{this.state.account}</span></p>

        </div>
        <header>

            <div className='header-left'>
                {/*<img src={Cir} className="cir"/>*/}
                <p>VOTING SYSTEM</p>
            </div>
            <div className='header-right'>
                <a href=''>Home</a>
                <a href=''>Statics</a>
                <button className='btn-h' onClick={this.buttonClick}>Admin</button>
                <button onClick={() => this.togglePopReg()}  className='btn-h' >Profile</button>
                <button onClick={this.logOut} className='btn-h'>Logout</button>
            </div>
        </header>
    </div>

                <div className='container-fluid mt-5'>
               
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{ maxWidth: '600px', minHeight: '100vm' }}>
                            {content}
                        </main>
                        
                     
                        {this.state.seenReg ? (
                    <PopUpReg toggle={this.togglePopReg} />
                ) : null}

                        {this.state.counter && (
                            <Navigate to="/" replace={true} />
                        )}
                        
                    </div>
                    
                </div>
               
              
              <button onClick={() => this.togglePop()}>PopUpChart </button>
               {this.state.seen ? (
                    <PopUpChart toggle={this.togglePop} maleCounter={this.state.maleCounter} femaleCounter=  {this.state.femaleCounter}/>
                ) : null}
               

            </section>




        )
    }
}

export default Home;