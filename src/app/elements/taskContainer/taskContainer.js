import {
  connect 
} from 'react-redux';

import styled from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme,
});

const Container = styled.div`
  width: 400px;
  border-radius: 25px;
  background: ${props =>
    props && props.theme && props.theme.backgroundColor};
  box-shadow: 9px 9px 18px
      ${props =>
    props && props.theme && props.theme.boxShadowPrimaryColor},
    -9px -9px 18px
      ${props =>
    props && props.theme && props.theme.boxShadowSecondaryColor};
  padding: 10px;
  min-height: 250px;
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
`;

export const TaskContainer = connect(mapStateToProps)(Container);
