import './config';
import { useState, useEffect } from "react"
import Todo from './todo';
import Categories from './categories';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import NotFound from '../pages/404';

export default function Taskboard({ heading, filters, newTodos, category, id }) {

    const [todos, setTodos] = useState(null);
    const [categories, setCategories] = useState([]);
    const [newCategories, setNewCategories] = useState([]);
    const [focused, setFocused] = useState(null);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const filterStr = "?owner=" + userId + (
            filters == null || filters == "" ? 
            "" : "&" + filters
        );
        const fetchData = async () => {
            const token = await getToken({ template: "codehooks" });
            const response = await fetch(global.config.backend.apiUrl + "/todo" + filterStr, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            const sortedData = data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setTodos(sortedData);
        }
        fetchData();
    }, [newTodos, newCategories]); // So I should probably add these seperately. Or I can just refresh

    const handleUpdateCategories = () => {
        console.log("handlin~~!");
        const update = {...focused}
        update.categories = categories.map(category => category.name);

        const fetchData = async () => {
            const token = await getToken({ template: "codehooks" });
            const response = await fetch(global.config.backend.apiUrl + "/todo/" + focused._id, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            });

            setNewCategories([...newCategories, "UPDATE"]);
        }
        fetchData();
    }

    const getById = (id) => {
        const todo = todos.find(todo => todo._id == id);
        if (focused != todo) {
            setFocused(todo);
        }

        if (!todo) {
            router.push('/404');
            return <NotFound />;
        }

        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 40px 20px 20px",
                width: "75%",
            }}>
                <Todo
                    key={JSON.stringify(todo)} 
                    id={todo._id}
                    prio={todo.priority}
                    text={todo.text} 
                    status={todo.status} 
                    date={todo.dueDate}
                    categories={todo.categories}
                    focused={true}
                />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                }}>
                    <Categories
                        setSelectedCategories={setCategories}
                        newCategories={newCategories}
                        containerStyle={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: 'fit-content',
                            marginRight: '10px',
                        }}
                    />
                    <button
                        onClick={handleUpdateCategories}
                        style={{
                            backgroundColor: 'green',
                            borderRadius: '5rem',
                            height: '2.5rem',
                            marginLeft: '0.5rem',
                            border: 'none',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Update Categories
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 40px 20px 20px",
            width: "75%",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
            }}>
                {heading}
                <img
                    src={`/iconmonstr-${router.pathname.split('/')[1] != 'done' ? 'check' : 'x'}-mark-1.svg`}
                    onClick={() => {
                        const pieces = router.pathname.split('/');
                        let newPath = pieces[1] != 'todos' ? '/todos/' : '/done/';
                        newPath += category ? category : '';
                        router.push(newPath);
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
                <div>Loading...</div> : ( id ? 
                    getById(id)
                : todos.filter(
                    ele => !category || (ele.categories && ele.categories.includes(category))
                ).map((todo, index) => {
                    return (
                        <Todo 
                            key={JSON.stringify(todo)} 
                            id={todo._id}
                            prio={todo.priority}
                            text={todo.text} 
                            status={todo.status} 
                            date={todo.dueDate}
                            categories={todo.categories}
                        />
                    )
                }))}
            </div>
        </div>
    );
}