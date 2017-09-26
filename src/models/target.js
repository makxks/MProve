export default class Target {
    constructor(name, points, length, description=""){
        this.name = name;
        this.points = points;
        this.length = length;
        this.completed = false;
        this.description = description;
        this.subtargets = [];
    }

    addSubtask(subtarget){
        this.subtargets.push(subtarget);

        //add on database
    }

    completeTask(){
        this.completed = true;
        for(var i=0; i<this.subtargets.length; i++){
            this.subtargets[i].completed = true;
        }

        //make changes on database
    }

    editTarget(name, points, length, description){
        this.name = name;
        this.points = points;
        this.length = length;
        this.description = description;
        //edit on database
    }

    deleteTarget(){
        //delete from database
    }

    addTarget(){
        //add reward to database
    }
}