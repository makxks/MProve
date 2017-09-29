export default class Reward {
    constructor(name, points, description){
        this.name = name;
        this.points = points;
        this.description = description;
        this.claimed = false;
    }

    claimReward(){
        this.claimed = true;
        //edit on database
    }

    editReward(name, points, description){
        this.name = name;
        this.points = points;
        this.description = description;
        //edit on database
    }

    deleteReward(){
        //delete from database
    }

    addReward(){
        //add reward to database
    }
}