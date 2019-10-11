import { message } from 'antd';

// data: [ { value: '', info: '', reject: '', regex: ''} ]
export const validate = data => {
  for (let i = 0; i < data.length; i += 1) {
    const rule = data[i];
    if (rule) {
      if (rule.regex && !RegExp(rule.regex).test(rule.value)) {
        message.error(rule.info);
        return false;
      }

      if (rule.reject !== undefined && rule.value === rule.reject) {
        message.error(rule.info);
        return false;
      }

      if (rule.value === '' || rule.value === undefined || rule.value === null) {
        // reject '', undefined, null
        message.error(rule.info);
        return false;
      }
    }
  }
  return true;
};

export const ratioRegex = /^([\d]{1,2}|100)$/;
export const moneyInputRegex = /^[\d]+(\.\d{1,2})?$/;
