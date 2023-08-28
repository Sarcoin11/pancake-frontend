import styled from 'styled-components'
import Image from 'next/image'
import discord from '../../images/socials/1.png'
import twitter from '../../images/socials/2.png'
import telegram from '../../images/socials/3.png'
import instagram from '../../images/socials/4.png'
import pinkBubble from '../../images/community-items/1.png'
import ring from '../../images/community-items/2.png'
import heart from '../../images/community-items/3.png'
import speaker from '../../images/community-items/4.png'
import yellowBubble from '../../images/community-items/5.png'

export const LeftImageWrapper = styled.div`
  width: 391px;
  height: 620px;
  position: absolute;
  top: 110px;
  left: calc(50% - 196px - 590px);
  img {
    position: absolute;

    &.discord {
      width: 180px;
      top: 357px;
      left: 29px;
      z-index: 2;
    }
    &.twitter {
      width: 230px;
      z-index: 3;
      top: 0;
      left: 30px;
    }
    &.telegram {
      width: 220px;
      top: 94px;
      left: 120px;
      z-index: 2;
    }
    &.instagram {
      width: 240px;
      left: 78px;
      top: 244px;
      z-index: 1;
    }
  }
`
export const RightImageWrapper = styled.div`
  position: absolute;
  width: 520px;
  height: 520px;
  top: -110px;
  left: calc(50% - 196px + 590px);
  img {
    position: absolute;
    &.pinkBubble {
      width: 150px;
      top: 300px;
      left: 100px;
      z-index: 3;
    }
    &.ring {
      width: 250px;
      top: 200px;
      left: -50px;
      z-index: 1;
    }
    &.heart {
      width: 80px;
      top: 120px;
      z-index: 3;
    }
    &.speaker {
      width: 250px;
      top: 100px;
      left: 50px;
      z-index: 3;
    }
    &.yellowBubble {
      width: 120px;
      top: 120px;
      z-index: 2;
      left: 200px;
    }
  }
`

export const RightTopBox: React.FC = () => {
  return (
    <RightImageWrapper>
      <Image className="pinkBubble" src={pinkBubble} alt="pinkBubble" />
      <Image className="ring" src={ring} alt="ring" />
      <Image className="heart" src={heart} alt="heart" />
      <Image className="speaker" src={speaker} alt="speaker" />
      <Image className="yellowBubble" src={yellowBubble} alt="yellowBubble" />
    </RightImageWrapper>
  )
}

export const LeftBottomBox: React.FC = () => {
  return (
    <LeftImageWrapper>
      <Image className="discord" src={discord} alt="discord" />
      <Image className="twitter" src={twitter} alt="twitter" />
      <Image className="telegram" src={telegram} alt="telegram" />
      <Image className="instagram" src={instagram} alt="instagram" />
    </LeftImageWrapper>
  )
}
