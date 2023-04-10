import './config';
import { useState, useEffect } from "react"
import Todo from './todo';

export default function Taskboard({ heading, user, filters, newTodos, category }) {

    const [todos, setTodos] = useState(null);
    const [sortByDate, setSortByDate] = useState(true);

    useEffect(() => {
        const filterStr = "?owner=" + user + (
            filters == null || filters == "" ? 
            "" : "&" + filters
        );
        const fetchData = async () => {
            const response = await fetch(global.config.backend.apiUrl + "/todo" + filterStr, {
                method: "GET",
                headers: {
                    "x-apikey": global.config.backend.apiKey
                }
            });
            const data = await response.json();
            sortTodos(data);
            setTodos(data);
        }
        fetchData();
    }, [newTodos]); // So I should probably add these seperately. Or I can just refresh

    const areListsEqual = (list1, list2) => {
        if (list1.length !== list2.length) {
            return false;
        }
    
        for (let i = 0; i < list1.length; i++) {
            if (JSON.stringify(list1[i]) != JSON.stringify(list2[i])) {
                return false;
            }
        }
    
        return true;
    }

    const sortTodos = (todos) => {
        todos.sort((a, b) => {
            const dateDiff = new Date(b.dueDate) - new Date(a.dueDate);
            const prioDiff = b.priority - a.priority;
            if (sortByDate && dateDiff !== 0) {
                return dateDiff;
            } else {
                return prioDiff;
            }
        })
    }

    useEffect(() => {
        if (todos) {
            const sortedTodos = [...todos];
            sortTodos(sortedTodos);
            if (!areListsEqual(todos, sortedTodos)) {
                setTodos(sortedTodos);
            }
        }
    }, [todos, sortByDate]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            padding: "20px 40px 20px 20px",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
            }}>
                {heading}
                <img
                    src={!sortByDate ? "date-icon.svg" : "self-timer-icon.svg"}
                    onClick={() => {
                        setSortByDate(!sortByDate);
                    }}
                    style={{ width: "30px" }}
                />
            </div> 
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
            }}>
                {todos == null ?
                <div>Loading...</div> :
                todos.filter(
                    ele => !category || (ele.categories && ele.categories.includes(category))
                ).map((todo, index) => {
                    return (
                        <Todo 
                            key={JSON.stringify(todo)} 
                            prio={todo.priority}
                            text={todo.text} 
                            status={todo.status} 
                            date={todo.dueDate}
                            categories={todo.categories}
                        />
                    )
                })}
            </div>
        </div>
    )
}