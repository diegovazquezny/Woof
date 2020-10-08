import React from 'react';
import styled from 'styled-components';
import styledItems from '../../../../styled-items';

export const InputStyle = styled.div`
	text-align: center;
	margin: .7em;
`;

const StyledInput = styled.input`
  padding: 10px;
  width: 80%;
`;

const StyledButton = styled.button`
  background-color: #5AC4FF;
  color: #fff;
  height: 2rem;
  width: 4rem;
  border-radius: 5px;
  border: 1px solid #2cb4fd;
  margin-left: 1rem;
  box-shadow: 1px 1px 1px #5AC4FF;
  &:hover {
    cursor: pointer;
    background-color: ${styledItems.lightGray};
    color: ${styledItems.darkGray};
  }
`;

export function InputContainer() {
	return (
		<InputStyle >
			<div className='input-container'>
				<form id="chat-form">
					<StyledInput id="msg" type="text" autoComplete="off" required/>
					<StyledButton>Woof!</StyledButton>
				</form>
			</div>
		</InputStyle >
	);
}
