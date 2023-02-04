import React from "react";

function MyMessage({ message }) {
    if (message?.attachments?.lenght > 0) {
        return (
            <img
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ float: "right" }}
            />
        );
    }

    return (
        <div
            className="message"
            style={{
                float: "right",
                marginRight: "18px",
                color: "aliceblue",
                backgroundColor: "darkblue",
            }}>
            {message.text}
        </div>
    );
}

export default MyMessage;
