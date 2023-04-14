import Taskboard from "../components/taskboard"
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import Login from "./login"
import { useState } from "react"
import { useAuth } from '@clerk/nextjs';

export default function Todos({done, category, id}) {

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [newTodos, setNewTodos] = useState([]);

    const addTodo = (todo) => {
        setNewTodos([...newTodos, todo]);
    }

    if (!userId) {
        return <Login />
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw"
        }}>
            <Header
                category={category} 
            />
            <div style={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                width: "100vw"
            }}>
                <Sidebar 
                    addTodo={addTodo}
                    category={category}
                    id={id}
                />
                <Taskboard 
                    heading={
                        <h2>
                            {done ?
                                "Done Items:" :
                                "Todo Items:"
                            }
                        </h2>
                    }
                    filters={done ? "status=Done" : null}
                    newTodos={newTodos}
                    category={category}
                    id={id}
                />
            </div>
        </div>
    )
}