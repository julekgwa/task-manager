import {
  connect 
} from 'react-redux';

import styled, {
  css 
} from 'styled-components';

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

  h1 {
    margin: 0;
    font-size: 27px;
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
`;

export const TaskContainer = connect(mapStateToProps)(Container);
