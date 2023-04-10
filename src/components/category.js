import { useState } from "react";

export default function Category( { category, selected, onClick } ) {

    return (
        <div 
            onClick={onClick}
            style={{
                backgroundColor: selected ? "var(--brown)" : "var(--green)",
                color: "var(--text)",
                padding: "3px",
                border: "2px solid black",
                borderRadius: "5px",
                marginRight: "5px"
            }}
        >
            {category}
        </div>
    );
}