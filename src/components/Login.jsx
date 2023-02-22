import { useState } from "react";
import axios from "axios";

const projectID = "628b78a5-c102-405b-837b-b308e5508df9";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {
            "Project-ID": projectID,
            "User-Name": username,
            "User-Secret": password,
        };

        //Nakon definiranja objekta authObject u funkciji handleSubmit se poziva asinkrona funkcija axios.get, koja koristi Axios biblioteku za slanje HTTP GET zahtjeva na URL https://api.chatengine.io/chats. Ovaj URL koristi Chat Engine API kako bi se dohvatili popis razgovora za autentificiranog korisnika.

        try {
            await axios.get("https://api.chatengine.io/chats", {
                headers: authObject,
            });

            //Kako bi se ovaj zahtjev autentificirao, potrebno je poslati zaglavlje (headers) koje sadrži ID projekta, korisničko ime i lozinku.

            localStorage.setItem("username", username);
            localStorage.setItem("password", password);

            window.location.reload();
            setError("");
        } catch (err) {
            setError("Oops, wrong username/password.");

            //Ako se uspješno dohvate podaci o razgovorima, u localStorage se sprema korisničko ime i lozinka kako bi se korisnik mogao automatski prijaviti pri sljedećoj posjeti aplikaciji. Zatim se poziva funkcija window.location.reload() kako bi se ponovno učitala aplikacija.
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">
                    <i> Welcome to </i>
                    <b>Chaterly</b>
                </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        placeholder="Password"
                        required
                    />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>
    );
};

export default Login;
