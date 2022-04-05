import React, { Component } from 'react'
import Admin from './Admin'
import Web3 from 'web3'
import Ballot from '../truffle_abis/Ballot.json'
import Main from './Main.js';
import Nav from "./Nav";
import { Moralis } from 'moralis';
import { Navigate } from "react-router-dom";
import { Button} from 'react-bootstrap';
const serverUrl = "https://obtz1utqtwxn.usemoralis.com:2053/server";
const appId = "BU9h9ioUi5crW9o8GDCqwHlAQTKA2lR7LCBTZKEj";
Moralis.start({ serverUrl, appId });

class Home extends React.Component {

    async logOut() {

        console.log(Moralis.User.current())
         await Moralis.User.logOut();
        this.setState({counter:1});  
            
    }
    async buttonClick() {
        
        let res = await this.state.ballot.methods.chairperson().call();
        console.log("res = ",res)
        console.log("this.state.account = ",this.state.account)
        if(this.state.account != res){
            alert('Only Admin Can Access This Page!')
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
        this.setState({ loading: true })
        this.state.ballot.methods.vote(candidate).send({ from: this.state.account }).on('transactionHash', (hash) => {
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



    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            ballot: {},
            res: '0',
            loading: true,
            candidateNames: [],
            counter: 0,
            buttonClicked: false


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


                <Nav account={this.state.account} a={true}></Nav>

                <div className='container-fluid mt-5'>

                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{ maxWidth: '600px', minHeight: '100vm' }}>
                            {content}
                        </main>
                        <button onClick={this.logOut} >Logout</button>

                        {this.state.counter && (
                            <Navigate to="/" replace={true} />
                        )}
                        <Button color="primary" className="px-4" onClick={this.buttonClick}
              >admin</Button>
                    </div>

                </div>
            </section>




        )
    }
}

export default Home;