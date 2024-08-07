import styled from "styled-components";

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  padding: 0 20px;
  ${({ theme }) => theme.mq.xs} {
    padding: 0 45px;
  }
`;

export default Content;
