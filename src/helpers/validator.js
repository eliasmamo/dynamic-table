const ERRORS = {
  NOT_A_NUMBER: 'not a valid number',
  MUST_BE_SELECT_OPTION: 'value should be one of options',
  IS_REQUIRED: 'value is required',
  NOT_A_VALID_DATE: 'date is invalid',
};

function validRequired(value, column) {
  const result = [];
  if (value === null || value === undefined || (column.type === 'Text' && value.length === 0)) {
    result.push(ERRORS.IS_REQUIRED);
  }
  return result;
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
    case 'Date':
      if (isNaN(Date.parse(value))) {
        result.push(ERRORS.NOT_A_VALID_DATE);
      }
      break;
    default: break;
  }

  return result;
}

function validate(value, column) {
  let errors = [
    ...validateValueByType(value, column),
  ];

  if (column.required) errors = errors.concat(validRequired(value, column));

  return errors;
}

function isValid(value, column) {
  return validate(value, column).length === 0;
}

export default { isValid };
