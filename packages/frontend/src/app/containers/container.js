import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 922px;

    /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    padding: 0 20px 0 20px;
    box-sizing: border-box;
  }
`;
