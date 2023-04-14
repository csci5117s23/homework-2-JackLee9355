import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontFamily: inter,
                    fontSize: '6rem',
                    color: '#1a1a1a',
                    marginBottom: '2rem',
                    textShadow: '10px 10px 20px #000000'
                }}>
                    Welcome to Epic Todos!
                </h1>
                <p style={{
                    fontFamily: inter,
                    fontSize: '2rem',
                    color: '#1a1a1a',
                    textShadow: '5px 5px 10px #000000'
                }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, metus eu sagittis imperdiet, mauris lectus ultrices mauris, vel ullamcorper turpis lorem vel justo.
                </p>
                <Link href="/todos/" style={{
                    fontFamily: inter,
                    fontSize: '2rem',
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    border: '2px solid #1a1a1a',
                    borderRadius: '10px',
                    textShadow: '5px 5px 3px #c0c0c0'
                }}>
                    Get Started
                </Link>
                <p style={{
                    fontFamily: inter,
                    fontSize: '0.8rem',
                    color: '#1a1a1a',
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem'
                }}>
                    I don't actually know what the latin says
                </p>
            </div>
        </>
    )
}