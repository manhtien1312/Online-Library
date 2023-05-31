import { useState } from "react";

function LoginHeader() {

    const headerStyle = {
        overflow: "hidden",
        background: "linear-gradient(to left, red, yellow)",
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
    }

    const [message, setMessage] = useState("Xin chào bạn!");

    return ( 
       <div style={headerStyle}>
            <h1>{message}</h1>
            <button onClick={() => setMessage("Bạn đã đăng nhập thành công!")}>Đăng nhập</button>
       </div>
    );
}

export default LoginHeader;