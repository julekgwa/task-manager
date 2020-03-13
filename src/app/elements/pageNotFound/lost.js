import styled from 'styled-components';

export const Lost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 400px;
    margin: 0;
  }

  p {
    font-size: 40px;
  }

  a {
    text-decoration: none;
  }

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    h1 {
      font-size: 200px;
    }
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    h1 {
      font-size: 400px;
      margin-top: -150px;
    }
  }
`;
