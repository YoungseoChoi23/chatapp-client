import "./App.css";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import socket from "./server";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  console.log("message List", messageList);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message)); //기존의 state(messageList) 값에 새로 받은 메시지를 덧붙임
    }); //서버가 여러 사람에게 broadcasting 한 메시지를 클라이언트가 듣는다.
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("이름을 입력하세요!");
    console.log("uuu", userName);

    //소켓 사용
    //emit을 이용해 말한다.
    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data); //res에 ok속성이 있으면 setUser(res.data); 수행
      }
    }); //login할게! userName은 이거야~, 콜백함수는 잘 처리가 되었는지 알려주는 함수
  };
  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
      setMessage("");
    });
  };
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
