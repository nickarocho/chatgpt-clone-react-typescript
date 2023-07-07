import { styled } from "styled-components";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const Sidebar = styled.section`
  background-color: var(--color-app-background-darker);
  height: 100vh;
  width: 260px;
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

const Feed = styled.ul`
  overflow: scroll;
  width: 100%;
  padding: 0;

  li {
    display: flex;
    background-color: #444654;
    width: 100%;
    padding: 20px;
    margin: 20px 0;
  }

  p {
    color: var(--color-app-white-8);
    font-size: 14px;
    text-align: left;

    &.role {
      min-width: 100px;
    }
  }
`;

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .input-container {
    position: relative;
    width: 80%;
    max-width: 650px;
    padding: 1rem;
    background-color: var(--color-app-white-0);
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0 54px 55px,
      rgba(0, 0, 0, 0.05) 0 -12px 30px, rgba(0, 0, 0, 0.05) 0 4px 6px,
      rgba(0, 0, 0, 0.05) 0 12px 3px, rgba(0, 0, 0, 0.05) 0 -3px 5px;
    display: flex;
  }
  textarea {
    font-family: "Open Sans", sans-serif;
    border: none;
    background-color: transparent;
    width: 100%;
    resize: none;
    font-size: 16px;
    line-height: 1.5;
    max-height: 200px;
    height: 24px;
    overflow-y: hidden;
    &:focus {
      outline: none;
    }
  }
  .info {
    color: var(--color-app-white-5);
    font-size: 12px;
    padding: 10px;
  }
`;

const SubmitBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  /* TODO: change color only when prompt has a value */
  background-color: #5bc083;
  border: none;
  border-radius: 0.375rem;

  svg {
    transform: rotate(45deg);
  }
`;

interface CompletionResponse {
  choices: Choice[];
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
}

interface Choice {
  finish_reason: string;
  index: number;
  message: Message;
}

interface Message {
  title: string;
  content: string;
  role: string;
}

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<Message | null>(null);
  const [previousChats, setPreviousChats] = useState<Message[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    console.log({ currentTitle, userPrompt, aiResponse });
    if (!currentTitle && userPrompt && aiResponse) {
      setCurrentTitle(userPrompt);
    }
    if (currentTitle && userPrompt && aiResponse) {
      setPreviousChats((prev) => [
        ...prev,
        {
          title: currentTitle,
          role: "user",
          content: userPrompt,
        },
        {
          title: currentTitle,
          role: aiResponse.role,
          content: aiResponse.content,
        },
      ]);
      setUserPrompt("");
    }
  }, [aiResponse, currentTitle]);

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: userPrompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("/api/completions", options);
      const data = (await response.json()) as CompletionResponse;
      console.log({ data });
      setAiResponse(data.choices ? data.choices[0]?.message : null);
    } catch (err) {
      console.error(err);
    }
  };

  const createNewChat = () => {
    setUserPrompt("");
    setCurrentTitle("");
    setAiResponse(null);
  };

  const handleSelectChat = (title: string) => {
    setCurrentTitle(title);
    setAiResponse(null);
    setUserPrompt("");
  };

  const currentChat = previousChats.filter(
    (chat) => chat.title === currentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChats.map((chat) => chat.title))
  );

  return (
    <AppWrapper>
      <Sidebar>
        <NewChatBtn onClick={createNewChat}>+ New chat</NewChatBtn>
        <ChatHistory>
          {uniqueTitles?.map((title, index) => (
            <li key={index} onClick={() => handleSelectChat(title)}>
              {title}
            </li>
          ))}
        </ChatHistory>
        <Nav>
          <p>Made by Nick</p>
        </Nav>
      </Sidebar>

      <Main>
        {!currentTitle && <h1>NickGPT</h1>}
        <Feed>
          {currentChat?.map((message, index) => (
            <li key={index}>
              <p className="role">{message.role}</p>
              <p>{message.content}</p>
            </li>
          ))}
        </Feed>
        <BottomSection>
          <div className="input-container">
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Send a message"
            />
            <SubmitBtn onClick={getMessages}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </SubmitBtn>
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
