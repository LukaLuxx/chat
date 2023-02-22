import React from "react";

function MyMessage({ message }) {
    if (message?.attachments?.length > 0) {
        //Optional chaining da ne dobijem error u runtimeu nego undefined
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
