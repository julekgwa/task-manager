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
  background-color: ${props =>
    props && props.theme && props.theme.backgroundColor};

  .container {
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    display: flex;
    border-radius: 25px;
    flex-direction: column;
    background: ${props =>
    props && props.theme && props.theme.backgroundColor};
    box-shadow: 9px 9px 18px
        ${props =>
    props && props.theme && props.theme.boxShadowPrimaryColor},
      -9px -9px 18px
        ${props =>
    props &&
          props.theme &&
          props.theme.boxShadowSecondaryColor};
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
