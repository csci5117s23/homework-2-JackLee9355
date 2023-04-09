export default function Todo({ prio, text, status, date }) {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            width: "20%"
        }}>
            <h1>Todo</h1>
            {prio}
            {text}
            {status}
            {date}
        </div>
    )
}