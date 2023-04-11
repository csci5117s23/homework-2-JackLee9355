import { useState } from "react";

export default function Category( { category, selected, onClick } ) {

    return (
        <div 
            onClick={onClick}
            style={{
                backgroundColor: selected ? "var(--brown)" : "var(--green)",
                color: "var(--text)",
                padding: "5px",
                border: "2px solid black",
                borderRadius: "5px",
                marginRight: "5px",
                marginBottom: "5px",
                width: "fit-content",
                height: "fit-content"
            }}
        >
            <span>{category}</span>
        </div>
    );
}