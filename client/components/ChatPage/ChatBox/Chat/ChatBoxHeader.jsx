import React from 'react';
import styled from 'styled-components';
// CONTEXT API IMPORT
import { useStateValue , StateContext , createContext} from '../../../../StateProvider';
import styledItems from '../../../../styled-items';

const StyledHeader = styled.div`
  color: ${styledItems.darkGray};
  font-size: 1.5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 36px;
  height: 36px;
  margin: 10px;
  border-radius: 18px;
  border: 1px solid ${styledItems.darkGray}
`;

export function ChatBoxHeader(props) {
  const selectedPartner = props.selectedPartner;
  const nameString = `${selectedPartner.firstName} & ${selectedPartner.petInfo.name}`;
  const userAvatar = selectedPartner.avatarUrl;
  const petAvatar = selectedPartner.petInfo.avatarUrl;
	return <StyledHeader><span>{nameString}</span><StyledImg src={userAvatar}/><StyledImg src={petAvatar}/></StyledHeader>;
}
