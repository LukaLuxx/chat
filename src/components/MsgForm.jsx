import React, { useContext } from "react";
import { useState } from "react";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";
import {
    sendMessage,
    isTyping,
    getMessages,
    ChatEngineContext,
} from "react-chat-engine";

function MessageForm(props) {
    //Funkcija MessageForm predstavlja formu za slanje poruka. Koristi se za unos teksta poruke, a zatim šalje poruku u aktivni chat.
    const [value, setValue] = useState("");
    const { chatId, creds } = props;

    const myContext = useContext(ChatEngineContext);

    const handleChange = (event) => {
        setValue(event.target.value);

        isTyping(props, chatId);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const text = value.trim();

        if (text.length > 0) {
            sendMessage(creds, chatId, { text }, () => {
                getMessages(props, chatId, (_chatId, messages) => {
                    myContext.setMessages(messages); //Kada se poruka pošalje, koristi se funkcija sendMessage za slanje poruke na ChatEngine server, a zatim se poziva funkcija getMessages za dohvaćanje novih poruka, myContext apdejta stanje 'messages' niza u contextu aplikacije sa novim porukama
                });
            });
        }

        setValue(""); //Vraćamo vrijednost na početak
    };

    const handleUpload = (event) => {
        sendMessage(creds, chatId, {
            files: event.target.files,
            text: "",
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        window.location.reload();
    }; //Miče se username iz Local Storagea

    const LogoutButton = () => (
        <button
            onClick={handleLogout}
            style={{
                background: "red",
                color: "white",
                height: "30px",
                cursor: "pointer",
                hover: "darkred",
                padding: "0",
            }}>
            Logout
        </button>
    );

    return (
        <div>
            {LogoutButton()}
            <div>
                <form className="message-form" onSubmit={handleSubmit}>
                    <input
                        className="message-input"
                        placeholder="Type in your message..."
                        value={value}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                    <label htmlFor="upload-button">
                        <span className="image-button">
                            <PictureOutlined className="picture-icon" />
                        </span>
                    </label>
                    <input
                        type="file"
                        multiple={false}
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleUpload.bind(this)}
                    />
                    <button type="submit" className="send-button">
                        <SendOutlined className="send-icon" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MessageForm;
