import { io } from "socket.io-client";
const socket = io("http://localhost:5001"); //<- 이 백엔드 주소로 연결할 수 있는 소켓을 만들겠다
export default socket;
