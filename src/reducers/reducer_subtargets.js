import { FETCH_SUBTARGETS } from '../actions/index';
import Subtarget from '../models/subtarget';

const INITIAL_STATE = { all: [] };

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_SUBTARGETS:
        var returnArray = [];
        for(var i=0; i<action.payload.length; i++){
            var newSubtarget = new Subtarget(
                action.payload[i].name,
                action.payload[i].points,
                action.payload[i].length,
                action.payload[i].parentName,
                action.payload[i].parent,
                action.payload[i].user,
                action.payload[i].description,
                action.payload[i].completed
            )
            returnArray.push(newSubtarget);
        }
        return { ...state, all: returnArray };
    default:
        return state;
    }
}