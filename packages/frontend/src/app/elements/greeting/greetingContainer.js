import styled from 'styled-components';

export const GreetingContainer = styled.div`
  margin: 100px 0 100px 0;
  div {
    display: inline-flex;
    flex-direction: column;
  }
  h1 {
    margin: 0;
    font-size: 50px;
  }

  p {
    margin: 0;
    text-align: right;
    text-transform: uppercase;
    font-size: 20px;
  }

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    padding: 0 20px 0 20px;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    padding: 0 20px 0 20px;
  }
`;
