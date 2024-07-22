import camelcaseKeys from 'camelcase-keys';

const responseCaseMiddleware = (data: Record<string, any> | any[], enable = true) => {
  if (!enable) {
    return data;
  }
  return camelcaseKeys(data, { deep: true });
};

export default responseCaseMiddleware;
