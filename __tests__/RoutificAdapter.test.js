const assert = require('assert');
const RoutificAdapter = require('../src/adapters/RoutificAdapter');

const inputData = {
  departureTime: 1508756400,
  home: {
    lat: 48.83310530000001,
    lng: 2.333563799999979,
  },
  tasks: [
    {
      id: 1,
      lat: 48.8623348,
      lng: 2.3447356000000354,
      duration: 45,
    },
    {
      id: 2,
      lat: 48.879251,
      lng: 2.282264899999973,
      duration: 60,
    },
    {
      id: 3,
      lat: 48.7251521,
      lng: 2.259899799999971,
      duration: 30,
    },
    {
      id: 4,
      lat: 48.83477,
      lng: 2.370769999999993,
      duration: 90,
    },
  ],
};

test('format input data to routific format', () => {
  const formattedData = RoutificAdapter.formatDataToRoutific(inputData);

  assert.equal(!!formattedData.visits, true);
  assert.equal(!!formattedData.fleet, true);
});


test('format routific response to output format', () => {
  const routificResponse = {
    total_travel_time: 130,
    total_idle_time: 0,
    total_visit_lateness: 0,
    total_vehicle_overtime: 0,
    vehicle_overtime: { tasks: 0 },
    total_break_time: 0,
    num_unserved: 0,
    unserved: null,
    solution: {
      tasks: [
        {
          location_id: 'tasks_start',
          location_name: 'tasks_start',
          arrival_time: '12:05',
        },
        {
          location_id: '4',
          location_name: '4',
          arrival_time: '12:17',
          finish_time: '13:47',
        },
        {
          location_id: '1',
          location_name: '1',
          arrival_time: '14:04',
          finish_time: '14:49',
        },
        {
          location_id: '2',
          location_name: '2',
          arrival_time: '15:10',
          finish_time: '16:10',
        },
        {
          location_id: '3',
          location_name: '3',
          arrival_time: '16:53',
          finish_time: '17:23',
        },
        {
          location_id: 'tasks_end',
          location_name: 'tasks_end',
          arrival_time: '18:00',
        },
      ],
    },
    total_working_time: 355,
    status: 'success',
    num_late_visits: 0,
  };

  const formattedData = RoutificAdapter.formatRoutificResponse(inputData, routificResponse);

  assert.equal(formattedData.totalTime, 485);
  assert.equal(formattedData.schedule.length, 4);
});
