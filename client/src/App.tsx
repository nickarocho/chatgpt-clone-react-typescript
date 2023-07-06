import { styled } from "styled-components";
import "./App.css";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const Sidebar = styled.section`
  background-color: var(--color-app-background-darker);
  height: 100vh;
  width: 244px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewChatBtn = styled.button`
  border: solid 0.5px var(--color-app-white-5);
  background-color: transparent;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: hsla(240, 9%, 59%, 0.1);
  }
`;

const Nav = styled.nav`
  border-top: solid 0.5px var(--color-app-white-5);
  padding: 10px;
  margin: 10px;
`;

const ChatHistory = styled.ul`
  list-style: none;
  height: 100%;
  padding: 10px;
  margin: 10px;

  li {
    padding: 15px 0;
    cursor: pointer;
  }
`;

const Main = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Feed = styled.ul``;

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    border: none;
    background-color: var(--color-app-white-0);
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0 54px 55px,
      rgba(0, 0, 0, 0.05) 0 -12px 30px, rgba(0, 0, 0, 0.05) 0 4px 6px,
      rgba(0, 0, 0, 0.05) 0 12px 3px, rgba(0, 0, 0, 0.05) 0 -3px 5px;

    &:focus {
      outline: none;
    }
  }
  #submit {
    position: absolute;
    right: 0;
    bottom: 10px;
    cursor: pointer;
  }
  .input-container {
    position: relative;
    width: 80%;
    max-width: 650px;
  }
  .info {
    color: var(--color-app-white-5);
    font-size: 12px;
    padding: 10px;
  }
`;

function App() {
  return (
    <AppWrapper>
      <Sidebar>
        <NewChatBtn>+ New chat</NewChatBtn>
        <ChatHistory>
          <li>hi</li>
        </ChatHistory>
        <Nav>
          <p>Made by Nick</p>
        </Nav>
      </Sidebar>

      <Main>
        <h1>NickGPT</h1>
        <Feed></Feed>
        <BottomSection>
          <div className="input-container">
            <input type="text" />
            <div id="submit">{">"}</div>
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts. ChatGPT May 24 Version
          </p>
        </BottomSection>
      </Main>
    </AppWrapper>
  );
}

export default App;
