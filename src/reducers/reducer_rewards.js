import { FETCH_REWARDS } from '../actions/index';
import Reward from '../models/reward';

const INITIAL_STATE = { all: [] };

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_REWARDS:
        var returnArray = [];
        for(var i=0; i<action.payload.length; i++){
            var newReward = new Reward(
                action.payload[i].name,
                action.payload[i].points,
                action.payload[i].description,
                action.payload[i].user
            )
            returnArray.push(newReward);
        }
        return { ...state, all: returnArray };
    default:
        return state;
    }
}