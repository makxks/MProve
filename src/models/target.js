import axios from 'axios';

export default class Target {
    constructor(name, points, length, username, description="", completed=false, subtargets=[]){
        this.name = name;
        this.points = points;
        this.length = length;
        this.completed = completed;
        this.description = description;
        this.user = username;
        this.subtargets = subtargets;
    }

    completeUncompleteTarget(changeTo){
        this.completed = changeTo;
        const body = JSON.stringify({ completed: changeTo });
        var config = {
            headers: {'Content-Type': 'application/json'}
        };
        axios.patch('/target/complete/' + this.name + '?username=' + this.user, body, config)
            .then(function(response){                
            })
            .catch(function(error){
                console.log(error);
            })
    }

    editTarget(name, points, length, description){
        var oldname = this.name;
        this.name = name;
        this.points = points;
        this.length = length;
        this.description = description;
        //edit on database
        const body = JSON.stringify({
            name: name,
            points: points,
            length: length,
            description: description
        });
        var config = {
            headers: {'Content-Type': 'application/json'}
        };
        axios.patch('/target/edit/' + oldname + '?username=' + this.user, body, config)
            .then(function(response){
            })
            .catch(function(error){
                console.log(error);
            });
    }

    createDBTarget(){
        const body = JSON.stringify(this);
        var config = {
          headers: {'Content-Type': 'application/json'}
        };
        axios.post('/target?username=' + this.user, body, config)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }

    deleteTarget(){
        //delete from database
        var config = {
            headers: {'Content-Type': 'application/json'}
          };
        axios.delete('/target/' + this.name + '?username=' + localStorage.getItem('username'), config)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }
}