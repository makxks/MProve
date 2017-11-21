import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RewardsReducer from './reducer_rewards';
import TargetsReducer from './reducer_targets';
import SubtargetsReducer from './reducer_subtargets';

const rootReducer = combineReducers({
  form: formReducer,
  rewards: RewardsReducer,
  targets: TargetsReducer,
  subtargets: SubtargetsReducer
});

export default rootReducer;
