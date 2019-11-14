import moment from 'moment';

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data, params) => rules.map(rule => rule(value, data, params)).filter(error => !!error)[0];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function signupEmailRestriction(value) {
  const tempValue = String(value).toLowerCase();
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  } else if (tempValue.includes('beta') && tempValue.includes('agentz.ai')) {
    return 'Temporarily email with combination beta and agentz.ai is not allowed';
  } else if (tempValue.includes('test') && tempValue.includes('gmail.com')) {
    return 'Temporarily email with combination Test and gmail.com is not allowed';
  }
}

export function mobile(value) {
  if (!isEmpty(value) && !/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)) {
    return 'Invalid mobile number.';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}


export function requiredWithTrimSpace(value){
  if(value){
    value=value.toString().trim();
    if(isEmpty(value)){
    return 'Required';
  }
  }else{
    return 'Required';
  }
  
}

export function integer(value) {
  if (!isEmpty(value) && !Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!enumeration.includes(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function passwordMatch(field){
  return(value,data) => {
    if(data){
      if(value!==data[field]){
        return `Passwords don't match`;
      }
    }
  }
}

export function validatePassword(password) {
  if (isEmpty(password)) {
    return 'Required';
  }
  if (password.search(/[a-z]/) === -1) {
    return 'Must have one lower case';
  }
  if (password.search(/[A-Z]/) === -1) {
    return 'Must have one upper case';
  }
  if (password.search(/\d/) === -1) {
    return 'Must have one number';
  }
  if (password.search(/[@!#$%^&*()~`,<.?/:;|+=-]/) === -1) {
    return 'Must have one special character';
  }
  if (password.length < 8) {
    return 'Must be at least 8 characters';
  }
}

export function createValidator(rules, params) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data, { key, ...params });
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

function flattenObject(ob) {
  const toReturn = {};
  if (typeof ob === 'object' && ob !== null) {
    Object.keys(ob).forEach(i => {
      if (!Object.prototype.hasOwnProperty.call(ob, i)) return;

      if (typeof ob[i] === 'object' && ob[i] !== undefined) {
        const flatObject = flattenObject(ob[i]);
        Object.keys(flatObject).forEach(x => {
          if (!Object.prototype.hasOwnProperty.call(flatObject, x)) return;
          if (!Number.isNaN(Number(i))) {
            toReturn[`[${i}].${x}`] = flatObject[x];
          } else {
            toReturn[`${i}.${x}`] = flatObject[x];
          }
        });
      } else {
        toReturn[i] = ob[i];
      }
    });
  }
  return toReturn;
}

export const handleOnSubmitFail = (errors, dispatch, submitError, props) => {
  document.getElementById(`${props.form}`).elements[
    Object.keys(flattenObject(JSON.parse(JSON.stringify(errors))))[0]
      .split('.[')
      .join('[')
  ].focus();
};

export const textRequired = value => (!value || value.toString().trim().length === 0 ? 'Required' : undefined);

export const textNoSpace = value => (value && value.indexOf(' ') > -1 ? 'Space not allowed' : undefined);

export const textAlphaNumeric = value =>
  value && /[^a-zA-Z0-9_\- ]/i.test(value)
    ? 'Sorry, only letters (a-z), numbers (0-9), and ( -, _ ) are allowed.'
    : undefined;

export function url(value) {
  if (!isEmpty(value) && !/^(https:\/\/)?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?/) {
    return 'Invalid url address';
  }
}

export const urlValidation =  value => (
  (!value || value.toString().trim().length === 0 || !/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(value.toLowerCase())) ?
     'Invalid url address':undefined
);


export const keyValidate = (value, allValues, props, name) => {
  if (
    value !== undefined &&
    !value &&
    // eslint-disable-next-line no-eval
    !isEmpty(eval(`allValues.${name.replace('headerName', 'entityFieldName')}`))
  ) {
    return 'Required';
  }
};

export const dataElementValidate = (value, allValues, props, name) => {
  if (
    value !== undefined &&
    !value &&
    // eslint-disable-next-line no-eval
    !isEmpty(eval(`allValues.${name.replace('entityFieldName', 'headerName')}`))
  ) {
    return 'Required';
  }
};

export const jsonNameValidate = (value, allValues, props, name) => {
  if (
    value !== undefined &&
    !value &&
    // eslint-disable-next-line no-eval
    !isEmpty(eval(`allValues.${name.replace('jsonFieldName', 'entityFieldName')}`))
  ) {
    return 'Required';
  }
};

export const reqDataElement = (value, allValues, props, name) => {
  if (
    value !== undefined &&
    !value &&
    // eslint-disable-next-line no-eval
    !isEmpty(eval(`allValues.${name.replace('entityFieldName', 'jsonFieldName')}`))
  ) {
    return 'Required';
  }
};

export const reqHeaderValue = (value, allValues, props, name) => {
  if (
    value !== undefined &&
    !value &&
    // eslint-disable-next-line no-eval
    !isEmpty(eval(`allValues.${name.replace('value', 'headerName')}`))
  ) {
    return 'Required';
  }
};

export const reqBodyValue = (value, allValues, props, name) => {
  if (
    value !== undefined &&
    !value &&
    // eslint-disable-next-line no-eval
    !isEmpty(eval(`allValues.${name.replace('value', 'jsonFieldName')}`))
  ) {
    return 'Required';
  }
};

export const textNumber = value => (value && /[^0-9]/i.test(value) ? 'Sorry, only numbers are allowed.' : undefined);

export const textWithoutSpecialChar = value =>
  value && !/[^a-zA-Z0-9]/.test(value) ? 'Sorry, special characters are not allowed.' : undefined;

export const textTitleLength = value => (value && value.length > 50 ? 'Allowed only 50 characters' : undefined);

export const textDescLength = value => (value && value.length > 150 ? 'Allowed only 150 characters' : undefined);

export const smsMessageLength = value => (value && value.length > 1500 ? 'Allowed only 1500 characters' : undefined);

export const endTimeValidate = (value, allValues, props, name) => {
  if (value) {
    // eslint-disable-next-line no-eval
    if (moment(eval(`allValues.${name.replace('endTime', 'startTime')}`), 'HH:mm') > moment(value, 'HH:mm')) {
      return 'End time must be greater than start time';
    }
  }
};

export function textWithOnlySpaceNotAllowed(value){
  if(value){
    value=value.toString().trim();
    if(isEmpty(value)){
    return 'Space alone not allowed';
  }
  }
 }
