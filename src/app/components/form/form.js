import PropTypes from 'prop-types';

import React from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  FormContainer 
} from 'app/elements/form/formContainer';

export const Form = ({ startDate, onDateChange, }) => (
  <FormContainer>
    <label htmlFor="task">Task</label>
    <input id="task" placeholder='Add task' autoFocus type="text" />
    <label htmlFor="date">Due date</label>
    <DatePicker id="date" selected={startDate} onChange={onDateChange} />
  </FormContainer>
)

Form.propTypes= {
  startDate: PropTypes.object,
  onDateChange: PropTypes.func,
}