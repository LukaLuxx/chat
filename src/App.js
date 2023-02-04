import { Button, ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import Login from "./components/Login";

import "./App.css";

const projectID = "628b78a5-c102-405b-837b-b308e5508df9";

function App() {
    if (!localStorage.getItem("username")) return <Login />;

    return (
        <div>
            <ChatEngine
                height="100vh"
                projectID={projectID}
                userName={localStorage.getItem("username")}
                userSecret={localStorage.getItem("password")}
                renderChatFeed={(chatAppProps) => (
                    <ChatFeed {...chatAppProps} />
                )}
                onNewMessage={() =>
                    new Audio(
                        "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
                    ).play()
                }
            />
        </div>
    );
}

export default App;
