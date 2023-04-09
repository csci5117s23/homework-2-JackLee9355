import './config';
import { useState, useEffect } from "react"
import Todo from './todo';
import { date } from 'yup';

export default function Taskboard() {

    const [todos, setTodos] = useState(null);

    useEffect(() => {
        console.log(global.config.backend.apiKey)
        console.log(global.config.backend.apiUrl)
        const fetchData = async () => {
            const response = await fetch(global.config.backend.apiUrl + "/todo", {
                method: "GET",
                headers: {
                    "x-apikey": global.config.backend.apiKey
                }
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            setTodos(data);
        }
        fetchData();
    }, []);

    const USER = "IDK";

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "20px",
        }}>
            Taskboard
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
            }}>
                {todos == null ?
                <div>Loading...</div> :
                todos.filter(ele => ele.owner == USER).map((todo, index) => {
                    return (
                        <Todo 
                            prio={todo.priority} 
                            text={todo.text} 
                            tatus={todo.status} 
                            data={todo.dueDate}
                            categories={todo.categories}
                        />
                    )
                })}
            </div>
        </div>
    )
}