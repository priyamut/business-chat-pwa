import request from 'superagent';
import {
    ResourceConfig
} from './../../../helpers/AppConstant';

function CreateSession(apiUrl, session) {
    console.log(`create session ${apiUrl} session ${session}`);
    return request
        .post(apiUrl)
        .send(session)
        .set('Content-Type', 'application/json');
}


function GetGlobalVariables(appUrl) {
    return request
        .get(appUrl+ResourceConfig.envGetResource)
        .set('Content-Type', 'application/json');
}


function GetVersion(appUrl) {
    return request
        .get( appUrl+   ResourceConfig.versionGetResource)
        .set('Content-Type', 'application/json');
}


export {
    CreateSession,
    GetGlobalVariables,
    GetVersion
};
