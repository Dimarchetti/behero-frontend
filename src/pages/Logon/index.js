import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import api from '../../services/api'

// Criando componente Logon
export default function Logon() {
	// Pegar o input de id e jogar dentro de um estado
	const [id, setId] = useState('')

	const history = useHistory()

	async function handleLogin(e) {
		// Sempre usar preventDefault em todos os formulários para evitar redirecionamentos e aquela carregada da página após clicar no botão
		e.preventDefault()
		
		try {
			const response = await api.post('sessions', { id }) // enviando id na rota sessions

			// localstorage salva esses dados no navegador para serem usados na aplicação inteira, aqui estão sendo usados para mandar essas informações para a página profle.
			localStorage.setItem('ongId', id)
			localStorage.setItem('ongName', response.data.name)

			// enviar para essa rota após submeter o botão 
			history.push('/profile')
		} catch (err) {
			alert('Falha no Login, tente novamente')
		}

	}

	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Logo" />

				<form onSubmit={handleLogin}>
					<h1>Faça seu logon</h1>
					<input 
						placeholder="Sua ID" 
						value={id}
						onChange={e => setId(e.target.value)}
					/>
					<button className="button" type="submit">Entrar</button>

					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
          </Link>
				</form>

			</section>

			<img src={heroesImg} alt="Heroes" />

		</div>
	)
}