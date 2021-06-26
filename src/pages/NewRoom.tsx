import { Link } from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {

    const { user } = useAuth()

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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type='text'
                            placeholder='Nome da sala'
                        />
                        <Button>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma <Link to='/'>sala existente?</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}