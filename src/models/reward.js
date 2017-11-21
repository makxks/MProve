import axios from 'axios';

export default class Reward {
    constructor(name, points, description, username){
        this.name = name;
        this.points = points;
        this.description = description;
        this.claimed = false;
        this.user = username;
    }

    claimUnclaimReward(changeTo){
        this.claimed = changeTo;
        //edit on database
        const body = JSON.stringify({changeClaim: changeTo});
        var config = {
          headers: {'Content-Type': 'application/json'}
        };
        axios.patch('/reward/claim/' + this.name + '?username=' + this.user, body, config)
            .then(function(response){
            })
            .catch(function(error){
                console.log(error);
            });
    }

    editReward(name, points, description){
        var oldname = this.name;
        this.name = name;
        this.points = points;
        this.description = description;
        const body = JSON.stringify({
            name: name,
            points: points,
            description: description
        });
        var config = {
            headers: {'Content-Type': 'application/json'}
        };
        axios.patch('/reward/edit/' + oldname + '?username=' + this.user, body, config)
            .then(function(response){
            })
            .catch(function(error){
                console.log(error);
            });
    }

    createDBReward(){
        const body = JSON.stringify(this);
        var config = {
          headers: {'Content-Type': 'application/json'}
        };
        axios.post('/reward?username=' + localStorage.getItem('username'), body, config)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }

    deleteReward(){
        var config = {
            headers: {'Content-Type': 'application/json'}
          };
        axios.delete('/reward/' + this.name + '?username=' + localStorage.getItem('username'), config)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }
}