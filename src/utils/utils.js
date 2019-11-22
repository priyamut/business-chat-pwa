import { strict } from 'assert';
import Fuse from 'fuse.js'

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


function flatten (array) {
  return array.reduce((flat, toFlatten) => (
    flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  ), [])
}

export function getValuesForKey (key, item) {
  const keys = key.split('.')
  let results = [item]
  keys.forEach(_key => {
    let tmp = []
    results.forEach(result => {
      if (result) {
        if (result instanceof Array) {
          const index = parseInt(_key, 10)
          if (!isNaN(index)) {
            return tmp.push(result[index])
          }
          result.forEach(res => {
            tmp.push(res[_key])
          })
        } else if (result && typeof result.get === 'function') {
          tmp.push(result.get(_key))
        } else {
          tmp.push(result[_key])
        }
      }
    })

    results = tmp
  })

  // Support arrays and Immutable lists.
  results = results.map(r => (r && r.push && r.toArray) ? r.toArray() : r)
  results = flatten(results)

  return results.filter(r => typeof r === 'string' || typeof r === 'number')
}

export function searchStrings (strings, term, {caseSensitive, fuzzy, sortResults, exactMatch} = {}) {
  strings = strings.map(e => e.toString())

  try {
    if (fuzzy) {
      if (typeof strings.toJS === 'function') {
        strings = strings.toJS()
      }
      const fuse = new Fuse(
        strings.map(s => { return {id: s} }),
        { keys: ['id'], id: 'id', caseSensitive, shouldSort: sortResults }
      )
      return fuse.search(term).length
    }
    return strings.some(value => {
      try {
        if (!caseSensitive) {
          value = value.toLowerCase()
        }
        if (exactMatch) {
          term = new RegExp('^' + term + '$', 'i')
        }
        if (value && value.search(term) !== -1) {
          return true
        }
        return false
      } catch (e) {
        return false
      }
    })
  } catch (e) {
    return false
  }
}

export function createFilter (term, keys, options = {}) {
  return (item) => {
    if (term === '') { return true }

    if (!options.caseSensitive) {
      term = term.toLowerCase()
    }

    const terms = term.split(' ')

    if (!keys) {
      return terms.every(term => searchStrings([item], term, options))
    }

    if (typeof keys === 'string') {
      keys = [keys]
    }

    return terms.every(term => {
      // allow search in specific fields with the syntax `field:search`
      let currentKeys
      if (term.indexOf(':') !== -1) {
        const searchedField = term.split(':')[0]
        term = term.split(':')[1]
        currentKeys = keys.filter(key => key.toLowerCase().indexOf(searchedField) > -1)
      } else {
        currentKeys = keys
      }

      return currentKeys.some(key => {
        const values = getValuesForKey(key, item)
        return searchStrings(values, term, options)
      })
    })
  }
}