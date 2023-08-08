import ALARM_NAME from '~/constants/alarmName';

async function live() {
  chrome.alarms.create(
    ALARM_NAME,
    {
      delayInMinutes: 1,
      periodInMinutes: 1,
    },
    () => {
      console.log('live');
    }
  );

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) console.log('ping');
  });
}

live();
