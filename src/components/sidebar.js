import React, { useState } from 'react';
import Categories from './categories';
import { useAuth } from '@clerk/nextjs';

export default function Sidebar( { addTodo } ) {
    const [inputValue, setInputValue] = useState('');
    const [newCategories, setNewCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const getSelectedCategories = () => {
        return selectedCategories.map( (category) => category.name);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue)
            return;
        
        const fetchData = async () => {
            const newTodo = {
                "owner": userId,
                "status": "WIP",
                "text": inputValue,
                priority: "1",
                dueDate: new Date(),
                categories: getSelectedCategories()
            };
            addTodo(newTodo);

            const token = await getToken({ template: "codehooks" });
            const response = await fetch(global.config.backend.apiUrl + "/todo", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });
        }
        fetchData();
    }

    return (
        <div style={{
            width: "20vw",
            minWidth: "20vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            borderRight: "2px solid black",
            backgroundColor: "var(--gray)",
            padding: "1rem"
        }}>
            <h2>New Todo</h2>
            <form 
                onSubmit={handleSubmit} 
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <textarea 
                    value={inputValue} 
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="Enter text here"
                    style={{
                        flexGrow: 1,
                        height: "10rem",
                        padding: "0.5rem",
                        border: "1px solid black",
                        borderRadius: "0.5rem"
                    }}
                />
                <Categories
                    setSelectedCategories={setSelectedCategories}
                    newCategories={newCategories}
                    containerStyle={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: "100%",
                        padding: "0.5rem",
                }}
                />
                <button 
                    type="submit"
                    style={{ 
                        backgroundColor: "var(--brown)",
                        borderRadius: "5rem",
                        height: "2.5rem",
                        marginLeft: "0.5rem",
                        border: "none",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold"
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}