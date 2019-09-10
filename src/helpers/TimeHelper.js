const moment = require('moment');

/**
 * Parse string and add the two values
 * @param {*} time1
 * @param {*} time2
 */
const addTime = (time1, time2 = 0) => {
  const intTime1 = parseInt(time1, 10);
  const intTime2 = parseInt(time2, 10);
  if (Number.isNaN(intTime1) || Number.isNaN(intTime2)) return null;

  return intTime1 + intTime2;
};

/**
 * convert time to timestamp with offset
 * @param {*} timestampOffset
 * @param {*} hours
 */
const computeTimestamp = (timestampOffset, hours) => {
  if (!timestampOffset || !hours) return null;

  const truncatedDate = moment.unix(timestampOffset).format('hh:mm');

  const diff = moment(hours, 'hh:mm').diff(moment(truncatedDate, 'hh:mm'), 'seconds');

  return moment.unix(timestampOffset).add(diff, 'seconds').unix();
};

module.exports = {
  addTime,
  computeTimestamp,
};
