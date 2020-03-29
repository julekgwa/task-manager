import {
  connect
} from 'react-redux';

import styled, {

  css
} from 'styled-components';

import {
  NOTIFICATION_TYPE
} from 'app/constants';

import {
  Colors
} from 'app/styles/colors';

const mapStateToProps = state => ({
  theme: state.theme,
});

const Container = styled.div`
  .task-info {
    display: flex;
    align-items: center;
    border-top: 2px solid ${Colors.darkGrayishBlue};
    animation-name: complete;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .info {
    display: flex;
  }

  .notify-container {
    bottom: -50px;
    position: absolute;
    display: flex;
  }

  .notify {
    bottom: -50px;
    position: absolute;
    display: flex;

    p {
      color: ${Colors.white};
      margin-left: 2px;
    }
    animation-name: notify;
    animation-duration: 3s;
    animation-direction: alternate;
    background-color: ${props => props.notifyType === NOTIFICATION_TYPE.deleted ? Colors.red : Colors.darkGreen}
  }

  .icon {
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    padding-left: 10px;
    align-items: center;

    svg {
      color: ${Colors.darkGrayishBlue};
    }

    svg.check {
      color: ${props =>
    (props && props.color) || Colors.darkGrayishBlue};
    }
  }

  svg.check:hover {
    color: ${Colors.softOrange};
  }

  .edit-sub {
    display: flex;
    justify-content: flex-end;

    svg {
      margin-left: 10px;
    }
  }

  .incomplete {
    background-color: ${Colors.softOrange}
  }

  .due-date {
    flex-basis: 15%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-content: space-between;

    p {
      margin-left: 5px;
      text-transform: uppercase;
      font-family: 'Signika', sans-serif;
    }

    svg {
      color: ${Colors.softOrange};
    }
  }

  .delete-task {
    justify-content: flex-end;
    display: flex;

    svg {
      color: ${Colors.darkGrayishBlue};
    }
  }

  h1 {
    padding: 20px;
    flex-grow: 2;
  }

  ${props =>
    props &&
    props.rootTask &&
    css`
      h1 {
        font-size: 50px;
        padding: 20px;
        font-weight: lighter;
        font-style: italic;
      }

      .task-info {
        border-top: 0;
      }
    `}

  ${props =>
    props &&
    props.incomplete &&
    css`
      .container {
        position: relative;
      }

      .task-info {
        animation-name: incomplete;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        box-shadow: 5px 5px 15px 5px ${Colors.black};
        background-color: ${props =>
    props && props.theme && props.theme.backgroundColor};
      }
    `}

    svg:hover {
    color: ${Colors.softOrange};
  }

  @keyframes incomplete {
    from {
      width: 100%;
      margin-left: 0;
    }
    to {
      width: 110%;
      margin-left: -5%;
    }
  }

  @keyframes complete {
    from {
      width: 110%;
      margin-left: -5%;
    }
    to {
      width: 100%;
      margin-left: 0;
    }
  }

  @keyframes notify {

    0%, 25% {
      /* opacity: .5; */
      bottom: -25px;
      background-color: transparent;
    }

    50%,
    75% {
      bottom: 0;
      /* opacity: 1; */
    }

    100% {
      /* opacity: 0; */
      bottom: -50px;
    }
  }
  
`;

export const EditItemContainer = connect(mapStateToProps)(Container);
