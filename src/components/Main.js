import React, {Component} from 'react'
import Web3 from 'web3';
import tether from '../tether.png'
class Main extends Component{
    render(){
        //console.log(this.props.tetherBalance)
        return(
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr style={{color: 'black'}}>
                            <th scope='col'>Voting Page</th>
                            {/* <th scope='col'>Reward Balance</th> */}
                        </tr>
                                                
                    </thead>
                    
                    <tbody>
                   
                    </tbody>

                </table>
                <div className='card mb-2' style={{opacity: '0.9'}}>
                    <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        console.log(event.target.elements.candidate.value)
                        this.props.voteFunction(event.target.elements.candidate.value)
                    }}
                    className='mb-3'>
                        <div style={{borderSpacing: '0 len'}}>
                            <label className='float-left' style={{marginLeft: '15px'}}>
                                <b></b>
                            </label>
                            <span className='float-right' style={{marginRight: '8px'}}>
                                Winner: {this.props.res}
                            </span>
                            <div className='input-group mb-4'>
                            <div>
                                <input
                               
                                type="radio" value="0" name="candidate" /> {this.props.candidateNames[0]}
                                <br/>
                                <input
                               
                                type="radio" value="1" name="candidate" /> {this.props.candidateNames[1]}
                                
                            </div>
                            
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>Vote</button>
                        </div>

                    </form>
                   
                    <button
                    type = 'submit'
                    onClick={(event) => {
                        event.preventDefault()
                        this.props.winningCandidateName()
                    }}
                    className='btn btn-primary btn-lg btn-block'>Result</button>
                </div>

            </div>
        )
    }
}
export default Main;