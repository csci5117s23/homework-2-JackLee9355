import Taskboard from "../components/taskboard"
import Header from "../components/header"
import Sidebar from "../components/sidebar"

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
            <div style={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                width: "100vw"
            }}>
                <Sidebar></Sidebar>
                <Taskboard />
            </div>
        </div>
    )
}