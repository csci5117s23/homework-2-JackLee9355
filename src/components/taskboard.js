import './config';
import { useState, useEffect } from "react"

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


    return (
        <div>
            Taskboard
            {todos == null ?
            <div>Loading...</div> :
            todos.map((todo, index) => {
                return (
                    <div key={index}>
                        {todo.title}
                    </div>
                )
            })}
        </div>
    )
}