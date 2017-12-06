import { FETCH_TARGETS } from '../actions/index';
import Target from '../models/target';

const INITIAL_STATE = { all: [] };

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_TARGETS:
        var returnArray = [];
        for(var i=0; i<action.payload.length; i++){
            var newTarget = new Target(
                action.payload[i].name,
                action.payload[i].points,
                action.payload[i].length,
                action.payload[i].user,
                action.payload[i].description,
                action.payload[i].completed,
                []
            )
            returnArray.push(newTarget);
        }
        return { ...state, all: returnArray };
    default:
        return state;
    }
}