import PropTypes from 'prop-types';

import React from 'react';

import {
  GreetingContainer
} from 'app/elements/greeting/greetingContainer';

import {
  Header
} from 'app/elements/header/header';

function getGreeting(now = new Date()) {

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = now.getHours();

  switch (true) {

  case hours >= 5 && hours <= 11:
    return {
      greeting: 'Good morning.',
      dateString: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  case hours === 12:
    return {
      greeting: 'It is high noon.',
      dateString: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  case hours >= 13 && hours <= 17:
    return {
      greeting: 'Good afternoon.',
      dateString: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  case hours >= 18 && hours <= 22:
    return {
      greeting: 'Good evening.',
      dateString: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  default:
    return {
      greeting:'ZZZZZZzzzzzzZZZZ',
      dateString: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  }

}

export const Greeting = ({ date, }) => {

  const { dateString, greeting, } = getGreeting(date);

  return (
    <GreetingContainer>
      <div>
        <Header>{greeting}</Header>
        <p>{dateString}</p>
      </div>
    </GreetingContainer>
  );

};

Greeting.propTypes = {
  date: PropTypes.instanceOf(Date),
};
