import axios from 'axios';

export const FETCH_REWARDS = 'FETCH_REWARDS';
export const FETCH_TARGETS = 'FETCH_TARGETS';
export const FETCH_SUBTARGETS = 'FETCH_SUBTARGETS';

export function fetchRewards(userEmail){
    return axios.get('/user?email=' + userEmail)
    .then(function(response){
        return axios.get('/reward?username=' + response.data.obj.username)
            .then(function(response1){
                return {
                    type: FETCH_REWARDS,
                    payload: response1.data.obj
                }
            })
        }
    )
}

export function fetchTargets(userEmail){
    return axios.get('/user?email=' + userEmail)
    .then(function(response){
        return axios.get('/target?username=' + response.data.obj.username)
            .then(function(response1){
                return {
                    type: FETCH_TARGETS,
                    payload: response1.data.obj
                }
            })
        }
    )
}

export function fetchSubtargets(userEmail, parentName){
    return axios.get('/user?email=' + userEmail)
    .then(function(response){
        return axios.get('/subtarget/' + parentName + '?username=' + response.data.obj.username)
            .then(function(response2){
                return {
                    type: FETCH_SUBTARGETS,
                    payload: response2.data.obj
                }
            })
        }
    )
}