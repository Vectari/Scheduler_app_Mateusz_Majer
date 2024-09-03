import styled from "styled-components";

const StyledInstructionsWrapper = styled.div`
  margin-left: 5rem;
`;

const InstructionsComponent = () => {
  return (
    <StyledInstructionsWrapper>
      <h3>Instrukcja:</h3>
      <ul>
        <li>
          <b>Tworzenie spotkania:</b> Dwukrotnie kliknij na wybrany przedział
          czasowy, aby utworzyć nowe spotkanie. Otworzy się formularz, w którym
          możesz wprowadzić szczegóły spotkania. Wypełnij wymagane informacje i
          zapisz.
        </li>
        <li>
          <b>Edycja spotkania:</b> Dwukrotnie kliknij na istniejące spotkanie,
          aby je edytować. Możesz zaktualizować szczegóły w formularzu, który
          się pojawi, a następnie zapisać zmiany.
        </li>
        <li>
          <b>Usuwanie spotkania:</b> Kliknij na spotkanie, aby otworzyć
          szczegóły. Następnie kliknij ikonę kosza, aby usunąć spotkanie.
        </li>
      </ul>
    </StyledInstructionsWrapper>
  );
};

export default InstructionsComponent;
