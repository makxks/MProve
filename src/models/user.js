export default class User {
    constructor(email, username){
        this.email = email;
        this.username = username;
        this.points = 0;
    }

    addUser(){
        //add to database
    }

    getUser(){
        //retrieve from database
    }

    addPoints(points){
        this.points += points;
    }

    usePoints(points){
        this.points -= points;
    }
}