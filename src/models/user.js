import axios from 'axios';

export default class User {
    constructor(email, username, points = 0, totalPointsEarned = 0, rewardsClaimed = 0, targetsReached = 0){
        this.email = email;
        this.username = username;
        this.points = points;
        this.totalPointsEarned = totalPointsEarned;
        this.rewardsClaimed = rewardsClaimed;
        this.targetsReached = targetsReached;
    }

    addPoints(points, isUnclaimReward = false){
        //set in user storage and on db
        this.points += points;
        var pointsChange;
        var rewardsChange;
        var targetsChange;
        if(isUnclaimReward){
            this.totalPointsEarned = this.totalPointsEarned;
            pointsChange = 0;
            rewardsChange = -1;
            targetsChange = 0;
        }
        else if(!isUnclaimReward) {
            this.totalPointsEarned += points;
            pointsChange = points;
            rewardsChange = 0;
            targetsChange = 1;
        }
        const body = JSON.stringify({
            points: points,
            totalPointsChange: pointsChange,
            rewardsChange: rewardsChange,
            targetsChange: targetsChange
        });
        var config = {
            headers: {'Content-Type': 'application/json'}
        };
        axios.patch('/user/points?username=' + this.username, body, config)
            .then(function(response){
            })
            .catch(function(error){
                console.log(error);
            })
    }

    usePoints(points, isClaimReward = false){
        //set in user storage and on db
        this.points -= points;
        var pointsChange;
        var rewardsChange;
        var targetsChange;
        if(isClaimReward){
            this.totalPointsEarned = this.totalPointsEarned;
            pointsChange = 0;
            rewardsChange = 1;
            targetsChange = 0;
        }
        else if(!isClaimReward) {
            this.totalPointsEarned -= points;
            pointsChange = -points;
            rewardsChange = 0;
            targetsChange = -1;
        }
        const body = JSON.stringify({
            points: -points,
            totalPointsChange: pointsChange,
            rewardsChange: rewardsChange,
            targetsChange: targetsChange
        });
        var config = {
            headers: {'Content-Type': 'application/json'}
        };
        axios.patch('/user/points?username=' + this.username, body, config)
            .then(function(response){
            })
            .catch(function(error){
                console.log(error);
            })
    }
}