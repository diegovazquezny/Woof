import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PartnerInfo } from '../PartnerInfo/PartnerInfo.jsx';
import { InputContainer } from './Chat/InputContainer.jsx';
import { ChatBoxHeader } from './Chat/ChatBoxHeader.jsx';
import { ChatBox } from './Chat/ChatBox.jsx';
import { Message } from './Chat/Message.jsx';
import formatMessage from '../../../../utils/messages';
import { useStateValue , StateContext , createContext} from '../../../StateProvider';

const ChatContainerStyle = styled.div`
	display: flex;
	min-height: 100%;
	min-width: 75%;
`;
const ChatContainerLeftStyle = styled.div`
	max-width: 60%;
	min-width: 60%;
`;
const ChatContainerRightStyle = styled.div`
	min-width: 40%;
	border: 1px solid blue;
`;

export function ChatContainer({ selectedPartner }) {
	console.log('selectedPartner: ', selectedPartner);
	const [messages, setMessages] = useState([]);
  const [componentMessages, setComponentMessages] = useState([]);
  // CONTEXT API, RELEVENT STATE ELEMENTS
  const [{ userInfo , petInfo }, dispatch] = useStateValue();

	// Output message to DOM
	function outputMessage(message) {
		messages.push(message);
		setMessages(messages);
		let messageList = [];
		for (let i = 0; i < messages.length; i+=1) {
			messageList.push(<Message messageInfo={messages[i]} key={`message${i}`} selectedPartner={selectedPartner} currentId={userInfo._id} userInfo={userInfo}/>)
		}
		setComponentMessages(messageList);
		// const div = document.createElement('div');
		// div.classList.add('message');
		// div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span><p class="text">${message.text}</p>`;
		// document.querySelector('.chat-messages').appendChild(div);
	}

	useEffect(() => {
		const chatForm = document.getElementById('chat-form');
		const chatMessages = document.querySelector('.chat-box');

		const socket = io.connect('http://localhost:3000');

		// Message from server

		socket.on('friendMessage', (message) => {
			console.log('Received message?: ', message);
			message.username = selectedPartner.firstName;
			outputMessage(message);

			// Scroll down
			chatMessages.scrollTop = chatMessages.scrollHeight;
		});

		socket.on('userMessage', (message) => {
			console.log('Sent message?: ', message);
			outputMessage(message);

			// Scroll down
			chatMessages.scrollTop = chatMessages.scrollHeight;
		});

		chatForm.addEventListener('submit', (e) => {
			e.preventDefault();

			// Get message text
			const msg = e.target.elements.msg.value;

			const send = formatMessage('Me', msg);

			// Emitting a message to the server
			socket.emit('userMessage', send);

			// Clear input
			e.target.elements.msg.value = '';
			e.target.elements.msg.focus();
		});
	}, []);
  
	return (
		<ChatContainerStyle>
			<ChatContainerLeftStyle>
				<ChatBoxHeader selectedPartner={selectedPartner} />
				<ChatBox chat={componentMessages} />
				<InputContainer />
			</ChatContainerLeftStyle>
			<ChatContainerRightStyle>
				<PartnerInfo selectedPartner={selectedPartner} />
			</ChatContainerRightStyle>
		</ChatContainerStyle>
	);
}
