pragma solidity ^0.5.0;

contract Ballot{
    string public name = 'ballot';
    struct Candidate{
        bytes32 name;
        uint voteCount;
        uint maleCount;
        uint femaleCount;
        uint region1Count;
        uint region2Count;
        uint region3Count;
    }
    struct Voter{
        bool voted;
        uint weight;
        uint vote;
    }
    Candidate[] public candidates;
    mapping(address => Voter) public voters;
    address public chairperson;
    constructor(bytes32[] memory candidateNames) public{
        chairperson = msg.sender;
        voters[chairperson].weight = 1; 
        for(uint i = 0; i < candidateNames.length; i++){
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0,
                maleCount: 0,
                femaleCount: 0,
                region1Count: 0,
                region2Count: 0,
                region3Count: 0
            }));
        }
    }
    function cLength() public view returns (uint256) {
    return candidates.length;
  }
    event Vote(uint candidate, string gender, string region);

    function giveAccessToVote(address voter) public {
        require(msg.sender == chairperson, 'Only the chairperson can give access to vote');
        require(!voters[voter].voted, 'The voter has already voted' );
        require(voters[voter].weight == 0, 'It already has access to Vote');
        voters[voter].weight = 1;
    }
    function vote(uint candidate, string memory gender, string memory region) public returns(bool success){
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, 'The Voter has already voted');
        require(sender.weight != 0, 'The person has no right to vote');
        sender.vote = candidate;
        sender.voted = true;
        candidates[candidate].voteCount += 1;
        if(keccak256(bytes(gender)) == keccak256(bytes('male'))){
            candidates[candidate].maleCount += 1;
        }else{
            candidates[candidate].femaleCount += 1;
        }
        if(keccak256(bytes(region)) == keccak256(bytes('Region1'))){
            candidates[candidate].region1Count += 1;
        }else if(keccak256(bytes(region)) == keccak256(bytes('Region2'))){
            candidates[candidate].region2Count += 1;
        }else{
            candidates[candidate].region3Count += 1;
        }
        emit Vote(candidate,gender,region);
        return true;
    }
    function winningCandidateIndex() public view returns(uint winningIndex_){
        uint winningVoteCount = 0;
        for(uint i = 0; i < candidates.length; i++){
            if(candidates[i].voteCount > winningVoteCount){
                winningVoteCount = candidates[i].voteCount;
                winningIndex_= i;
            }
        }
    }
    function winningCandidateName() public view returns(bytes32 winningName_){
        winningName_ = candidates[winningCandidateIndex()].name;
    }
   
}