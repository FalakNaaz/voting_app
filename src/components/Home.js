import React, {Component} from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'
import Ballot from '../truffle_abis/Ballot.json'
import Main from './Main.js'

class Home extends Component{
    
    async componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
        }else{
            alert('No ethereum browser found! you can check metamask!')
        }
    }
    async loadBlockchainData(){
        const ethers =  require('ethers');
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        //console.log(account,'hey hey')
        const networkId =await  web3.eth.net.getId()
        //console.log(networkId,'Network ID')

        //load tether data
        const ballotData = Ballot.networks[networkId]
        let ballot
        if(ballotData){
            let temp = []
             ballot = new web3.eth.Contract(Ballot.abi, ballotData.address)
            this.setState({ballot:ballot})

            let l = await this.state.ballot.methods.cLength().call();
            for(let i = 0; i < l; i++){
                let namee = await this.state.ballot.methods.candidates(i).call();
                namee = ethers.utils.parseBytes32String(namee.name)
                //console.log(namee.name)
                temp[i] = namee
                
            }
            this.setState({candidateNames: temp})
        }else{
            window.alert('Error! tether contract not deployed - no detected network!')
        }

        this.setState({loading:false})

    }
      voteFunction = (candidate) => {
        this.setState({loading: true })
        this.state.ballot.methods.vote(candidate).send({from: this.state.account}).on('transactionHash', (hash) => {
          this.setState({loading:false})
        }) 
      }
       winningCandidateName =   async() => {
        const ethers =  require('ethers');
        let res = await this.state.ballot.methods.winningCandidateName().call();
        res = ethers.utils.parseBytes32String(res)
        console.log("The winner is: ", res)
        this.setState({res: res.toString() }) 
      }

      
    
    constructor(props){
        super(props)
        this.state = {
            account: '0x0',
            ballot: {},
            res: '0',
            loading: true,
            candidateNames: []
            
            
        }
    }
    render(){
        let content
        {this.state.loading ?
             content= <p id='loader' className='text-center' style={{margin: '30px'}}>Loading...</p> :
              content=
               <Main 
               res = {this.state.res}
                voteFunction = {this.voteFunction}
                winningCandidateName= {this.winningCandidateName}
                candidateNames = {this.state.candidateNames}
                //ballot = {this.state.ballot}
               />
            }
        return(
            

            <div >
                
                     <Navbar account = {this.state.account}/>
                   <div className='container-fluid mt-5'>
                        <div className='row'>
                            <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth : '600px', minHeight : '100vm'}}>
                                {content}
                            </main>

                        </div>
                        
                    </div> 
                    
                    
                    
            </div>
            
        )
    }
}

export default Home;