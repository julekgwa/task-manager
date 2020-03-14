import {
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React, {

  Component 
} from 'react';

import {
  connect 
} from 'react-redux';

import {
  Greeting 
} from 'app/components/greeting';

import {
  Tasks 
} from 'app/components/tasks/tasks';

import {
  Button 
} from 'app/elements/button/button';

import {
  Header 
} from 'app/elements/header/header';

import {
  ListHeader 
} from 'app/elements/listHeader/listHeader';

import {
  withLogger 
} from 'app/hoc/withLogger';

import {
  getTasks
} from 'app/redux/actions';

import {
  Colors 
} from 'app/styles/colors';

const mapStateToProps = state => ({
  isLoading: state.home.isLoading,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks()),
});

class TodoHome extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    tasks: PropTypes.array,
    getTasks: PropTypes.func,
  };

  static defaultProps = {
    tasks: [],
    isLoading: false,
    getTasks: () => {},
  };

  componentDidMount = () => {

    this.props.getTasks();
  
  }

  render = () => {

    const tasks = this.props.tasks || [];
    const isLoading = this.props.isLoading;

    return (
      <>
        <Header color={Colors.softOrange}>Home</Header>
        <Greeting />
        {isLoading ? (
          <h1>Loading...</h1>
        ) :  (
          <>
            <div style={{
              display: 'flex' ,
              flexWrap: 'wrap',
            }}>

              <ListHeader>

                <Header>Tasks</Header>
                <Button circle>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
                
              </ListHeader>

              <Tasks tasks={tasks} />
            </div>
          </>
        )}
      </>
    );
  
  };

}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoHome));
