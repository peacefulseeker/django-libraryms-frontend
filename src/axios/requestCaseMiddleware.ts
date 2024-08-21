import decamelizeKeys from 'decamelize-keys';

const requestCaseMiddleware = (data: {}) => decamelizeKeys(data, { deep: true });

export default requestCaseMiddleware;
