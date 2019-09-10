const assert = require('assert');
const TaskHelper = require('../src/helpers/TasksHelper');

test('get task by id in list of tasks', () => {
  const firstTask = {
    id: 1,
    lat: 48.8623348,
    lng: 2.3447356000000354,
    duration: 45,
  };
  const tasks = [
    firstTask,
    {
      id: 2,
      lat: 48.8623348,
      lng: 2.3447356000000354,
      duration: 45,
    },
    {
      id: 3,
      lat: 48.8623348,
      lng: 2.3447356000000354,
      duration: 45,
    },
  ];

  const task = TaskHelper.getTaskById(tasks, firstTask.id);

  assert.equal(task, firstTask);
});
