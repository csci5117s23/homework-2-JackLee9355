import Category from './category'

export default function Todo({ prio, text, status, date, categories }) {

    // categories = ["one", "two", "three", "four"]

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
                <span>{text}</span>
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