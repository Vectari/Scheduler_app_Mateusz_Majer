import styled from "styled-components";
import SchedulerComponent from "./components/SchedulerComponent";
import InstructionsComponent from "./components/InstructionsComponent";

const StyledSchedulerWrapper = styled.div`
  display: grid;
  place-items: center;
`;

function App() {
  return (
    <>
      <StyledSchedulerWrapper>
        <SchedulerComponent />
      </StyledSchedulerWrapper>
      <InstructionsComponent />
    </>
  );
}

export default App;
