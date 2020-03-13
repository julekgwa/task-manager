import styled from "styled-components";
export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props =>
    props && props.theme && props.theme.alternate} !important;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${props =>
    props && props.theme && props.theme.backgroundColor};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: ${props => props && props.theme && props.theme.alternate};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(55px);
  }
  .slider:after {
    content: "THEME";
    color: ${props => props && props.theme && props.theme.backgroundColor};
    display: block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 11px;
    margin-left: 5px;
  }

  input:checked + .slider:after {
    content: "THEME";
    margin-left: -6px;
  }
`;
