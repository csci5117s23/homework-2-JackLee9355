import Taskboard from "../components/taskboard"
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import { useState } from "react"

export default function Todos({done}) {

    const [newTodos, setNewTodos] = useState([]);

    const addTodo = (todo) => {
        setNewTodos([...newTodos, todo]);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw"
        }}>
            <Header />
            <div style={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                width: "100vw"
            }}>
                <Sidebar addTodo={addTodo}/>
                <Taskboard 
                    heading={
                        <h2>
                            {done ?
                                "Done Items:" :
                                "Todo Items:"
                            }
                        </h2>
                    }
                    user={"IDK"} 
                    filters={done ? "status=Done" : null}
                    newTodos={newTodos}
                />
            </div>
        </div>
    )
}