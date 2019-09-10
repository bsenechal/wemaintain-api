const moment = require('moment');
const { without } = require('lodash');
const { getTaskById } = require('../helpers/TasksHelper');
const { addTime, computeTimestamp } = require('../helpers/TimeHelper');

/**
 * Format tasks to Routific visits
 * @param {*} tasks
 */
const getVisitsFromTasks = (tasks) => {
  const visits = [];

  tasks.map((task) => {
    visits[task.id] = {
      location: {
        lat: task.lat,
        lng: task.lng,
      },
      duration: task.duration,
      customNotes: {
        id: task.id,
        lat: task.lat,
        lng: task.lng,
      },
    };
    return null;
  });

  return { ...visits };
};

/**
 * Create Routific fleet
 * @param {*} home
 * @param {*} departureTime
 */
const getFleetFromHomeAndDepartureTime = (home, departureTime) => ({
  tasks: {
    start_location: {
      lat: home.lat,
      lng: home.lng,
    },
    end_location: {
      lat: home.lat,
      lng: home.lng,
    },
    shift_start: moment(departureTime).format('hh:mm'),
  },
});


/**
 * Convert wemaintain input data to Routific format
 * @param {*} payload
 */
const formatDataToRoutific = (payload) => ({
  visits: getVisitsFromTasks(payload.tasks),
  fleet: getFleetFromHomeAndDepartureTime(payload.home, payload.departureTime),
});

/**
 * Format output schedule
 * @param {*} departureTime
 * @param {*} initialTasks
 * @param {*} tasks
 */
const formatSchedule = (departureTime, initialTasks, tasks) => without(tasks.map((task) => {
  const initialTask = getTaskById(initialTasks, task.location_id);
  if (!initialTask) return null;

  return {
    id: initialTask.id,
    startsAt: computeTimestamp(departureTime, task.arrival_time),
    endsAt: computeTimestamp(departureTime, task.finish_time),
    lat: initialTask.lat,
    lng: initialTask.lng,
  };
}), null);

/**
 * Convert Routific response to wemaintain output format
 * @param {*} initialPayload
 * @param {*} response
 */
const formatRoutificResponse = (initialPayload, response) => ({
  totalTime: addTime(response.total_travel_time, response.total_working_time),
  schedule: formatSchedule(
    initialPayload.departureTime,
    initialPayload.tasks,
    response.solution.tasks,
  ),
});

module.exports = {
  formatDataToRoutific,
  formatRoutificResponse,
};
