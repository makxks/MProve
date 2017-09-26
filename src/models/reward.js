export default class Reward {
    constructor(name, points){
        this.name = name;
        this.points = points;
        this.claimed = false;
    }

    claimReward(){
        this.claimed = true;
        //edit on database
    }

    editReward(name, points){
        this.name = name;
        this.points = points;
        //edit on database
    }

    deleteReward(){
        //delete from database
    }

    addReward(){
        //add reward to database
    }
}