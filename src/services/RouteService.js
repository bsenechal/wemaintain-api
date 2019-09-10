const fetch = require('node-fetch');
const { formatRoutificResponse, formatDataToRoutific } = require('../adapters/RoutificAdapter');


// Routific main documentation: https://docs.routific.com/docs/api-reference

/**
 * Compute optimized route
 * Data format: https://gist.github.com/Esya/bcdbe6bba687ef59ad7b76ac35ca8200
 * @param {*} payload
 */
const computeOptimizedRoute = async (payload) => {
  const response = await fetch(`https://api.routific.com/v${process.env.ROUTIFIC_VERSION}/vrp`,
    {
      method: 'post',
      body: JSON.stringify(formatDataToRoutific(payload)),
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.ROUTIFIC_TOKEN,
      },
    });

  return formatRoutificResponse(payload, await response.json());
};

module.exports = {
  computeOptimizedRoute,
};
