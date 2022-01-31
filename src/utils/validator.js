export default function validator(data, config) {
  const errors = {};
  function validate(validateMethod, fieldData, fieldConfig) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired':
        if (typeof fieldData === 'boolean') {
          statusValidate = !fieldData;
        } else {
          statusValidate = fieldData.trim() === '';
        }

        break;
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(fieldData);

        break;
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(fieldData);
        break;
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(fieldData);
        break;
      }
      case 'min': {
        statusValidate = fieldData.length < fieldConfig.value;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return fieldConfig.message;
  }
  Object.keys(data).forEach((fieldName) => {
    if (config[fieldName])
      Object.keys(config[fieldName]).forEach((validateMethod) => {
        const error = validate(
          validateMethod,
          data[fieldName],
          config[fieldName][validateMethod]
        );
        if (error && !errors[fieldName]) {
          errors[fieldName] = error;
        }
      });
  });

  return errors;
}
