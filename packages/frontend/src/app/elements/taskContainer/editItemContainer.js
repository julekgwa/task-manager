import {
  connect
} from 'react-redux';

import styled, {

  css
} from 'styled-components';

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
    background-color: ${Colors.softOrange};
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

  @keyframes incomplete-mobile {
    from {
      width: 90%;
      margin-left: 0;
    }
    to {
      width: 100%;
      margin-left: 0;
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

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0;

    h1 {
      font-size: 20px;
    }

    .task-info {
      animation-name: incomplete-mobile;
    }
  }
`;

export const EditItemContainer = connect(mapStateToProps)(Container);
