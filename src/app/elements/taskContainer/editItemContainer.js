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
  theme: state.app.theme,
});

const Container = styled.div`
  .task-info {
    display: flex;
    align-items: center;
    border-top: 2px solid ${Colors.darkGrayishBlue};
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
        width: 110%;
        box-shadow: 5px 5px 15px 5px ${Colors.black};
        margin-left: -5%;
        background-color: ${props =>
    props && props.theme && props.theme.backgroundColor};
      }
    `}

    svg:hover {
    color: ${Colors.softOrange};
  }
`;

export const EditItemContainer = connect(mapStateToProps)(Container);
