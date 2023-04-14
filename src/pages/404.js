import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "30%",
            width: "30%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "40px",
            padding: "40px"
        }}>
            <h1>404</h1>
            <h2><a href="https://www.youtube.com/watch?v=tH2w6Oxx0kQ">All we are is dust in the wind...</a></h2>
            <Link href="/todos/">To Todos</Link>
        </div>
    </div>
  )
}
