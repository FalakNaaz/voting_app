const Ballot = artifacts.require('Ballot')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Ballot', (accounts) => {
    let ballot
    before(async() =>{
        ballot = await Ballot.new()
    })
    describe('ballot deployment', async() =>{
        it('matches name successfully', async() => {
            
            const name = await ballot.name()
            assert.equal(name, 'ballot')

        })
        it('voting function works', async() => {
            await ballot.vote(1, {from: accounts[1]})
            await ballot.vote(0, {from: accounts[2]})
            await ballot.vote(1, {from: accounts[3]})
            const winner = await ballot.winningCandidateName()
            assert.equal(winner.toString(), '2')
        })
    })
})