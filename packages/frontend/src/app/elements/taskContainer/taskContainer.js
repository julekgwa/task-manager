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
  width: 300px;
  border-radius: 25px;
  margin: 10px;
  background: ${props =>
    props && props.theme && props.theme.backgroundColor};
  box-shadow: 9px 9px 18px
      ${props =>
    props && props.theme && props.theme.primaryShadowColor},
    -9px -9px 18px
      ${props =>
    props && props.theme && props.theme.secondaryShadowColor};
  padding: 10px;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;

  ${props =>
    props.isDeleting &&
    css`
      animation-name: removed;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in;
      background-size: 100% 200%;
      background-image: linear-gradient(
        to bottom,
        ${props => props.theme.backgroundColor} 50%,
        ${Colors.red} 50%
      );
      transition: background-position 0.2s ease-in-out,
        color 0.2s ease-in-out;
      animation-name: removed;
      border: 3px solid red;
    `}

  h1 {
    margin: 0;
    font-size: 27px;
    color: ${props =>
    (props && props.color) ||
      (props.theme && props.theme.headerColor)};
  }

  h3 {
    color: ${props =>
    (props && props.color) ||
      (props.theme && props.theme.headerColor)};
  }

  div {
    width: 100%;
  }

  p {
    margin: 0;
  }

  .todo {
    svg {
      color: ${Colors.white};
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    align-content: space-between;

    svg {
      color: ${props =>
    (props && props.color) ||
        (props.theme && props.theme.paragraph)};
      margin: 5px;
    }

    ${'svg'} {
      &:hover {
        color: ${Colors.softOrange};
      }
    }

    .loader {
      svg {
        color: ${Colors.red};
      }
    }
  }

  @keyframes removed {
    from {
      background-position: 0 0;
    }

    to {
      background-position: 0 100%;
    }
  }

  .task-title {
    padding: 10px 10px 20px 10px;

    h1 {
      text-transform: uppercase;
    }
  }

  .no-due-task {
    text-align: center;
    width: 100%;
  }

  &:hover {
    box-shadow: inset 9px 9px 18px
        ${props =>
    props && props.theme && props.theme.primaryShadowColor},
      inset -9px -9px 18px
        ${props =>
    props && props.theme && props.theme.secondaryShadowColor};
  }

  ${props =>
    props &&
    props.noTasks &&
    css`
      box-shadow: none;
      min-height: 0;

      p {
        font-size: 30px;
      }
    `}

  ${props =>
    props &&
    props.edit &&
    css`
      width: 100%;
      margin-top: 50px;
      min-height: 150px;
      align-items: flex-start;
      padding: 0;

      .task-status {
        display: flex;
        justify-content: flex-end;
        padding: 10px;
        background-color: ${props =>
    props && props.theme && props.theme.alternate};

        p {
          font-size: 20px;
          font-family: 'Signika', sans-serif;
          color: ${props =>
    props && props.theme && props.theme.editParagraphColor};
        }
      }

      .add-todo {
        display: flex;
        justify-content: flex-end;

        svg {
          color: ${Colors.white};
        }
      }

      .disable-button {
        display: flex;
        justify-content: flex-end;

        svg {
          color: ${Colors.grayishBlue};
        }
      }

      .add-task {
        display: flex;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        align-content: space-between;
        padding: 30px;
        background-color: ${props =>
    (props && props.color) ||
          (props.theme && props.theme.headerColor)};
      }

      &:hover {
        box-shadow: 9px 9px 18px
            ${props =>
    props && props.theme && props.theme.primaryShadowColor},
          -9px -9px 18px
            ${props =>
    props &&
              props.theme &&
              props.theme.secondaryShadowColor};
      }
    `}

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const TaskContainer = connect(mapStateToProps)(Container);
