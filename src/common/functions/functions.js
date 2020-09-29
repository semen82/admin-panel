export const createKey = (prefix, amount = 12) => {
  const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const len = chars.length;
  let codeArr = [];

  for (let i = 0; i < amount; i++) {
    let index = Math.round(Math.random() * (len - 1));
    codeArr.push(chars[index]);
  }

  let result = prefix ? `${prefix}-${codeArr.join('')}` : codeArr.join('');

  return result;
};
