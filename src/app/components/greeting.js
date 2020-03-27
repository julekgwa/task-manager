import React from 'react';

import {
  GreetingContainer 
} from 'app/elements/greeting/greetingContainer';

import {
  Header 
} from 'app/elements/header/header';

function getGreeting() {

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const hours = now.getHours();

  switch (true) {

  case hours >= 5 && hours <= 11:
    return {
      greeting: 'Good morning.',
      date: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  case hours === 12:
    return {
      greeting: 'It is high noon.',
      date: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  case hours >= 13 && hours <= 17:
    return {
      greeting: 'Good afternoon.',
      date: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };

  case hours >= 18 && hours <= 22:
    return {
      greeting: 'Good evening.',
      date: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };
  
  default:
    return {
      greeting:'ZZZZZZzzzzzzZZZZ',
      date: `${weekDays[now.getDay()]}, ${now.getDate()}`,
    };
  
  }

}

export const Greeting = () => {

  const { date, greeting, } = getGreeting();

  return (
    <GreetingContainer>
      <div>
        <Header>{greeting}</Header>
        <p>{date}</p>
      </div>
    </GreetingContainer>
  );

};
