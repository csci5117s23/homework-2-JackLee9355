import Category from './category';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function Todo({ id, prio, text, status, date, categories, focused }) {

    const [done, setDone] = useState(status == "Done");
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();

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

    const handleClick = (event) => {
        if (event.target.closest('.done-button')) {
            return;
        }

        router.push("/todo/" + id);
    }

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
            width: "80%",
            position: 'relative'
        }} onClick={handleClick}>
            {done && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.5,
                zIndex: 1,
              }}></div>
            )}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                zIndex: 2,
            }}>
                <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '80vw',
                    paddingRight: '30px'
                }}>{text}</span>
                <img 
                    src={`/iconmonstr-${done ? 'x' : 'check'}-mark-1.svg`}
                    onClick={() => setDone(!done)}
                    className="done-button"
                >
                </img>
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