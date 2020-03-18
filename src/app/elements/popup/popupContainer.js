import {
  connect 
} from 'react-redux';

import styled from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme,
});

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  opacity: 1;
  background-color: rgba(236, 240, 243, .5);

  .container {
    width: 800px;
    min-height: 300px;
    margin: 100px auto;
    opacity: 1;
    display: flex;
    border-radius: 25px;
    flex-direction: column;
    background: ${props =>
    props && props.theme && props.theme.backgroundColor};
    box-shadow: 9px 9px 18px
        ${props =>
    props && props.theme && props.theme.primaryShadowColor},
      -9px -9px 18px
        ${props =>
    props &&
          props.theme &&
          props.theme.secondaryShadowColor};
  }

  .message {
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: column;
    margin-top: 30px;

    p {
      text-align: center;
    }
  }

  .form {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 30px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
    align-content: space-between;

    button {
      margin-left: 15px;
    }
  }
`;

export const PopupContainer = connect(mapStateToProps)(Container);
