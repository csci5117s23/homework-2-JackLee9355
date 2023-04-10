import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <SignIn></SignIn>
        </div>
    );
}