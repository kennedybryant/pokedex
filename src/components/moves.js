import React from "react";

export default function Moves(props) {
    return (
        <div className="moves-popup-box">
            <div className="moves-box">
                <span className="moves-close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    )
}