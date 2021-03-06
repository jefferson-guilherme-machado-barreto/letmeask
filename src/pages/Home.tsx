import { useHistory } from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function Home() {

    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    const handleCreateRoom = async () => {

        if (!user) {
            await signInWithGoogle()
        } 

        history.push('/rooms/new')
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} alt='Ilustração de perguntas e respostas' />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>tire duvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt='LetMeAsk'/>
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg}  alt='Logo do google'/>
                        Crie uma sala com google
                    </button>
                    <div className='separator'> ou entre em uma sala </div>
                    <form>
                        <input
                            type='text'
                            placeholder='Digite o código da sala'
                        />
                        <Button>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}