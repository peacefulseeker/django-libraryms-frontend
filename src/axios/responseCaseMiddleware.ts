import camelcaseKeys from 'camelcase-keys';

const responseCaseMiddleware = (data: {}, enable = true) => {
  if (!enable) {
    return data;
  }
  return camelcaseKeys(data, { deep: true });
};

export default responseCaseMiddleware;
