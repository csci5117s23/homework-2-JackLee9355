import { useAuth, UserButton, SignIn } from '@clerk/nextjs';

export default function Header() {

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    return (
        <div style={{
            paddingLeft: "10px",
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            height: '75px',
            width: '100vw',
            backgroundColor: 'var(--green)',
            borderBottom: '2px solid black',
        }}>
            <h1>Header</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignContent: 'center',
                paddingRight: '40px',
                height: '100%'
            }}>
                {userId && <UserButton />}
            </div>
        </div>
    )
}