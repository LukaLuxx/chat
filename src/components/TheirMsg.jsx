import React from "react";

function TheirMessage({ lastMessage, message }) {
    const isFirstMsgUser =
        !lastMessage || lastMessage.sender.username === message.sender.username;

    return (
        <div className="message-row">
            <div
                className="message-avatar"
                style={{
                    backgroundImage: `url(${message?.sender?.avatar})`,
                }}
            />

            {message?.attachments?.lenght > 0 ? (
                <img
                    src={message.file}
                    alt="message-attachment"
                    className="message-image"
                    style={{ marginLeft: isFirstMsgUser ? "50px" : "48px" }}
                />
            ) : (
                <div
                    className="message"
                    style={{
                        float: "left",
                        backgroundColor: "green",
                        color: "white",
                        marginLeft: isFirstMsgUser ? "30px" : "48px",
                    }}>
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default TheirMessage;
