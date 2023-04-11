import Category from './category';
import { useState, useEffect } from 'react';

export default function Todo({ id, prio, text, status, date, categories }) {

    // categories = ["one", "two", "three", "four"]
    const [done, setDone] = useState(status === "done");

    // Update the status of the todo on codehooks
    useEffect(() => {
        const fetchData = async () => {
            const update = {
                status: done ? "Done" : "WIP",
            }

            if (update.status == status) {
                return;
            }

            const token = await getToken({ template: "codehooks" });
            const response = await fetch(global.config.backend.apiUrl + "/todo/" + id, {
                method: "PATCH",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            });
        }
        
        fetchData();
    }, [done]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            width: "80%"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '80vw',
                    paddingRight: '30px'
                }}>{text}</span>
                <span style={{
                    textAlign: "right",
                }}>{prio}</span>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    {categories && categories.map((category, index) => {
                        return <Category key={index} category={category} />   
                    })}
                </div>
                <span style={{
                    textAlign: "right",
                    color: "grey",
                }}>
                    <i>{date == null ? "None" : new Date(date).toLocaleString()}</i>
                </span>
            </div>
        </div>
    )
}