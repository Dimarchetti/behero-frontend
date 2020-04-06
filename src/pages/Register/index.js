import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
// Importando Api
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'


// Função Register inclui cada um dos inputs do formulário dentro de um estado
export default function Register() {
	const[name, setName] = useState('')
	const[email, setEmail] = useState('')
	const[whatsapp, setWhatsapp] = useState('')
	const[city, setCity] = useState('')
	const[uf, setUf] = useState('')
	
	// Envia o usuário de volta para a página de login
	const history = useHistory()

	// Função que vai pegar os dados do formulário do frontend
	async function handleRegister(e) {
		// Evita o comportamento Default de carregar a página ao enviar o usuário
		e.preventDefault()

		const data = {
			name,
			email,
			whatsapp,
			city,
			uf,
		}
		
		try {
			// Chamada para a API. Joga os dados da variável 'data' q está com os inputs dentro da rota ongs que está no node (rota ongs no insomnia). o axios já envia o 'data' em formato .json então não precisa transformar.
			const response = await api.post('ongs', data)

			alert(`Seu ID de acesso: ${response.data.id}`)
			//envia o usuário de volta para essa rota após o cadatro de uma nova ong.
			history.push('/')
		} catch (err){
			alert(`Erro no cadastro, tente novamente.`)
		}
	}

	// retorna o frontend
	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be the Hero" />

					<h1>Cadastro</h1>
					<p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG</p>

					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#e02041" />
                        Já tenho cadastro. Fazer login.
                    </Link>
				</section>
				<form onSubmit={handleRegister}>
					<input 
						placeholder="Nome da ONG"
						value={name}

						// Função (arrow function) que recebe o campo de input. A função joga o input 'e.target.value' dentro do parâmetro 'e' 
						onChange={e => setName(e.target.value)} 
					/>
					
					<input 
						type="email" placeholder="E-mail"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					
					<input 
						placeholder="Whatsapp"
						value={whatsapp}
						onChange={e => setWhatsapp(e.target.value)}
					/>

					<div className="input-group">
						<input 
							placeholder="Cidade"
							value={city}
							onChange={e => setCity(e.target.value)}
						/>
						
						<input 
							placeholder="UF" 
							style={{ width: 80 }}
							value={uf}
							onChange={e => setUf(e.target.value)} 
						/>
					</div>
					<button className="button">Cadastrar</button>
				</form>
			</div>
		</div>
	)
}