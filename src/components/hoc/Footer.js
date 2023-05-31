import React from "react";

function Footer(props) {

    const footerStyle = {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        background: "linear-gradient(to left, yellow, red)",
    };

    return ( 
        <div style={footerStyle}>
            <h2>Đây là Footer</h2>
        </div>
    );
}

export default Footer;