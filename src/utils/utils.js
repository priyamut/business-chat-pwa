import { strict } from 'assert';

export const isEmpty = value => value === undefined || value === null || value === '';

export function toValueArray(value) {
  return Array.isArray(value) ? value : value.split(',');
}

export function getErrorMessage(error) {
  if (!error.errors || (error.errors && error.errors.length === 0)) {
    return error.errorMessage || '';
  }
  let result = '<ul class="alert-errors">';
  error.errors.map(message => {
    result = `${result}<li>${message}</li>`;
    return 0;
  });
  return `${result}</ul>`;
}

export function isMultiLocSupportedAgent (Agent){
  if(Agent.masterBusinessId){
    return true;
  }else{
      return false;
  }
}

export function addAgentzChatbotLauncher(
  renderToParentId,
  mode,
  domainId,
  agentId,
  title,
  botUrl,
  businessId,
  userId,
  userName,
  brandingProperties,
  businessAgentId,
  masterBusinessAgent,
  isReadMode,
  sessionId
) {
  const agentChatbotUrl = getAgentzChatbotUrl(
    renderToParentId,
    mode,
    domainId,
    agentId,
    title,
    botUrl,
    businessId,
    userId,
    userName,
    businessAgentId,
    masterBusinessAgent,
    isReadMode,
    sessionId
  );
  const chatBotUrl = `${agentChatbotUrl}&version=1&${brandingProperties}`;
  const script = document.createElement('script');
  script.async = true;
  script.src = chatBotUrl;
  script.id = 'agentzChatbotScript';
  document.getElementById(renderToParentId).appendChild(script);
}

export function getAgentzChatbotUrl(
  renderToParentId,
  mode,
  domainId,
  agentId,
  title,
  botUrl,
  businessId,
  userId,
  userName,
  businessAgentId,
  masterBusinessAgent,
  isReadMode,
  sessionId
) {
  let agentChatbotUrl = '/business/agentz-chatbot.js?';
  const scripts = Array.from(document.querySelectorAll('script')).map(scr => scr.src);
  if (!scripts.includes(agentChatbotUrl)) {
    agentChatbotUrl = `${agentChatbotUrl}version=1&botUrl=${botUrl}`;
    if(mode){
      agentChatbotUrl =`${agentChatbotUrl}&mode=${mode}`;
    }
    if (domainId) {
      agentChatbotUrl = `${agentChatbotUrl}&domain=${domainId}`;
    }
    if (agentId) {
      agentChatbotUrl = `${agentChatbotUrl}&agent=${agentId}`;
    }
   
    if (title) {
      agentChatbotUrl = `${agentChatbotUrl}&title=${title}`;
    }
    if (mode === 'business' ||mode==='Transcript'||mode==='Single_Transcript') {
      agentChatbotUrl = `${agentChatbotUrl}&business=${businessId}`;
      agentChatbotUrl = `${agentChatbotUrl}&livesupportmode=business_livesupport`;
      if(mode === 'Transcript'){
        agentChatbotUrl=`${agentChatbotUrl}&transcriptBusinessId=${businessAgentId}`;
      }
    }else if(masterBusinessAgent){
      agentChatbotUrl = `${agentChatbotUrl}&masterBusinessAgent=${masterBusinessAgent}`;
    }else{
      agentChatbotUrl = `${agentChatbotUrl}&businessAgent=${businessId}`;
    }
    if (userId) {
      agentChatbotUrl = `${agentChatbotUrl}&userId=${userId}`;
    }
    if (userName) {
      agentChatbotUrl = `${agentChatbotUrl}&userName=${userName}`;
    }
    if(isReadMode){
      agentChatbotUrl = `${agentChatbotUrl}&isReadMode=${isReadMode}`;
    }
    if(sessionId){
      agentChatbotUrl = `${agentChatbotUrl}&sessionId=${sessionId}`; 
    }
    console.log(`agentzchatbotUrl ${agentChatbotUrl}`);
    return agentChatbotUrl;
  }
}
