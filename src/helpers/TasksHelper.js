const { head, isEmpty } = require('lodash');

/**
 * Return first task found by id
 * @param {*} tasks
 * @param {*} id
 */
const getTaskById = (tasks = [], id) => {
  const taskId = parseInt(id, 10);
  if (Number.isNaN(taskId) || isEmpty(tasks)) return null;

  return head(tasks.filter((task) => parseInt(task.id, 10) === taskId));
};


module.exports = {
  getTaskById,
};
