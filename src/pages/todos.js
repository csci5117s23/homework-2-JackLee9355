import Taskboard from "../components/taskboard"
import Header from "../components/header"

export default function Todos() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw"
        }}>
            <Header />
            Todos
            <Taskboard />
        </div>
    )
}