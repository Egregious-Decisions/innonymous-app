type TimeFormat = 'time' | 'chat_time' | 'date' | 'full';

type DateTimeProps = {
  time: Date;
  format: TimeFormat;
};

const week = 7 * 24 * 60 * 60 * 1000;

const getTimeOfDay = (date: Date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const getDateString = (date: Date) => date.toLocaleDateString('en', { dateStyle: 'medium' });

const getChatTime = (date: Date) => {
  const today: number = new Date().setHours(0, 0, 0, 0);
  const thatDay: number = new Date(date).setHours(0, 0, 0, 0);

  if (thatDay === today) {
    // 23:30 or 11:30 PM
    return getTimeOfDay(date);
  }
  if (today - thatDay < week) {
    // Sun
    return date.toLocaleDateString('en', { weekday: 'short' });
  }

  // Apr 16, 2023
  return getDateString(date);
};

const DateTime = ({ time, format }: DateTimeProps) => {
  let formattedTime;
  switch (format) {
    case 'time':
      formattedTime = getTimeOfDay(time);
      break;
    case 'chat_time':
      formattedTime = getChatTime(time);
      break;
    case 'date':
      formattedTime = getDateString(time);
      break;
    default:
      formattedTime = time.toLocaleString('en', { dateStyle: 'full', timeStyle: 'medium' });
      break;
  }

  return <span>{formattedTime}</span>;
};

export default DateTime;
