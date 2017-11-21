import axios from 'axios';

export default class Subtarget {
    constructor(name, points, length, parentName, username, description="", completed=false){
        this.name = name;
        this.points = points;
        this.length = length;
        this.parentName = parentName;
        this.user = username;
        this.description = description;
        this.completed = completed;
    }

    addDBSubtarget(){
        console.log(this);
        const body = JSON.stringify(this);
        
        var config = {
          headers: {'Content-Type': 'application/json'}
        };
        axios.post('/subtarget?username=' + this.user, body, config)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }

    completeUncompleteSubtarget(changeTo){
        this.completed = changeTo;
        const body = JSON.stringify({ completed: changeTo });
        var config = {
            headers: {'Content-Type': 'application/json'}
        };
        axios.patch('/subtarget/complete/' + this.name + '?username=' + this.user, body, config)
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
        axios.patch('/subtarget/edit/' + oldname + '?username=' + this.user, body, config)
            .then(function(response){
            })
            .catch(function(error){
                console.log(error);
            });
    }

    deleteSubtarget(){
        //delete from database
        var config = {
            headers: {'Content-Type': 'application/json'}
          };
        axios.delete('/subtarget/' + this.name + '?username=' + localStorage.getItem('username'), config)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }
}