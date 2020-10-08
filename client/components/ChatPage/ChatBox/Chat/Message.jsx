import React from 'react';
import styled from 'styled-components';
// CONTEXT API IMPORT
import { useStateValue , StateContext , createContext} from '../../../../StateProvider';
import styledItems from '../../../../styled-items';

const StyledText = styled.div`
  color: ${styledItems.darkGray};
  font-size: 1.2em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledPartnerText = styled.div`
  color: ${styledItems.darkGray};
  font-size: 1.2em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 30px;
  height: 30px;
  margin: 6px;
  border-radius: 15px;
  border: 1px solid ${styledItems.darkGray}
`;

const StyledTime = styled.span`
  font-size: .08em;
  color: ${styledItems.lightGray};
`;


export function Message({ messageInfo, selectedPartner, currentId }) {
  const [{ userInfo , petInfo }, dispatch] = useStateValue();
  const timeString = messageInfo.time
  const textString = `${messageInfo.text}`;
  const partnerAvatar = selectedPartner.avatarUrl;
  const partnerPetAvatar = selectedPartner.petInfo.avatarUrl;
  const userAvatar = userInfo.avatarUrl;
  const userPetAvatar = petInfo.avatarUrl;

  let userItem = <StyledText className='message'>{textString}<StyledImg src={userAvatar}/><StyledImg src={userPetAvatar}/><StyledTime>{timeString}</StyledTime></StyledText>;
  let partnerItem = <StyledPartnerText className='message'><StyledTime>{timeString}</StyledTime><StyledImg src={partnerAvatar}/><StyledImg src={partnerPetAvatar}/>{textString}</StyledPartnerText>
  let chatItem = userItem;
  if (messageInfo.username != userInfo.firstName) chatItem = partnerItem;
  return (
    // <div className='message'>
    //   <p className="meta">{messageInfo.username}</p>
    //     <span>{messageInfo.time}</span>
    //   <p className="text">{messageInfo.text}</p>
    // </div>

    <div>{chatItem}</div>
    
  );
  

	// return <StyledHeader><span>{nameString}</span><StyledImg src={userAvatar}/><StyledImg src={petAvatar}/></StyledHeader>;
}


{/* <Message messageInfo={messages[i]} key={`message${i}`} selectedPartner={selectedPartner} currentId={userInfo._id} */}