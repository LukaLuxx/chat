import React from "react";
import MessageForm from "./MsgForm";
import MyMessage from "./MyMsg";
import TheirMessage from "./TheirMsg";

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat]; //provjeravamo postoji li chat sa indeksom [activeChat] inače je undefined

    const renderReadReceipts = (message, isMyMessage) =>
        chat.people.map(
            //Unutar map metode, funkcija provjerava ako person.last_read postoji i je istina.
            (person, index) =>
                person.last_read && (
                    <div
                        key={`read_${index}`}
                        className="read-receipt"
                        style={{
                            float: isMyMessage ? "right" : "left",
                            backgroundImage: `url(${person.person.avatar})`,
                        }}
                    /> //ova funkcija vraća niz div elemenata koji predstavljaju ikone pročitane poruke za svaku osobu u chatu koja je pročitala zadnju poruku.
                )
        );

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            // funkcija mapira ovaj niz ključeva pomoću keys.map() i za svaki ključ dohvaća poruku i provjerava je li ta poruka poslana od trenutno prijavljenog korisnika
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index];
            const isMyMessage = userName === message.sender.username; //userName predstavlja korisničko ime trenutno prijavljenog korisnika, a message.sender.username predstavlja korisničko ime pošiljatelja poruke
            return (
                <div key={`msg_${index}`} style={{ width: "100%" }}>
                    <div className="message-block">
                        {isMyMessage ? ( // Ako je poruka poslana od trenutno prijavljenog korisnika, koristi se komponenta MyMessage za prikazivanje poruke
                            <MyMessage message={message} />
                        ) : (
                            <TheirMessage
                                message={message}
                                lastMessage={messages[lastMessageKey]}
                            /> // //Ako je poruka poslana od trenutno prijavljenog korisnika, koristimo MyMessage komponentu i prosljeđujemo joj objekt  message kao props. Ako nije, koristimo TheirMessage komponentu i prosljeđujemo joj objekt message kao props i prošlu poruku u chatu kao lastMessage prop, koja se koristi za određivanje hoće li se prikazati profilna slika pošiljatelja poruke.
                        )}
                    </div>

                    <div
                        className="read-receipts"
                        style={{
                            marginRight: isMyMessage ? "18px" : "0px",
                            marginLeft: isMyMessage ? "0px" : "2px",
                        }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        });
    };

    if (!chat) return <div />; //definiramo varijablu chat koja dohvaća chat s ID-om activeChat iz niza chats. Ako chat ne postoji, vraća se prazni div element

    return (
        // Naslov se dohvaća iz objekta chat.title, a podnaslov se sastoji od korisničkih imena svih osoba u chatu, koja se dohvaćaju iz niza chat.people
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: "100px" }} />
            <div className="message-form-container">
                {/* forma je definirana u komponenti MessageForm, kojoj
                prosljeđujemo sve propse iz glavne komponente ChatFeed, kao i
                chatId prop koji odgovara ID-u aktivnog chata. */}
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
};

export default ChatFeed;
