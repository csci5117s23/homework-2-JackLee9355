export default function Todo({ prio, text, status, date }) {

    return (
        <div style={{
            backgroundColor: "smokewhite"
        }}>
            <h1>Todo</h1>
            {prio}
            {text}
            {status}
            {date}
        </div>
    )
}