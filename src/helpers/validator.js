const ERRORS = {
  NOT_A_NUMBER: 'not a valid number',
  MUST_BE_SELECT_OPTION: 'value should be one of options',
};

function validRequired(value) {
  return value !== null && value !== undefined;
}

function validateValueByType(value, column) {
  const result = [];

  switch (column.type) {
    case 'Number':
      if (isNaN(parseFloat(value)) || !isFinite(value)) {
        result.push(ERRORS.NOT_A_NUMBER);
      }
      break;
    case 'Select':
      if (column.options.indexOf(value) === -1) {
        result.push(ERRORS.MUST_BE_SELECT_OPTION);
      }
      break;
    default: break;
  }

  return result;
}

function validate(value, column) {
  const errors = [
    ...validateValueByType(value, column),
  ];

  if (column.required) errors.concat(validRequired(value));

  return errors;
}

function isValid(value, column) {
  return validate(value, column).length === 0;
}

export default { isValid };
