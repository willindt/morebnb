import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Link, Image } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'


const Wrapper = styled(Flex)`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
 const Row = styled(Flex)`
  
 `
 const SocialsBox = styled.div`
 .effect {
   width: 100%;
   // padding: 50px 0px 70px 0px;
   // background-color: #212121;
   
   h2 {
     color: #fff;
     font: {
       family: 'Playfair Display', serif;
       weight: 400;
       size: 25px;
     }
     letter-spacing: 3px;
   }
   
   &:nth-child(2) {
     margin-top: 50px;
   }
   
   &:nth-child(2n+1) {
     // background-color: #fff;
     
     h2 {
       color: #212121;
     }
   }
   
   &:nth-child(2n) {
     
     a {
       color: #fff;
       border-color: #fff;
     }
   }
   
   .buttons {
     margin-top: 40px;
     display: flex;
     justify-content: center;
   }

   a {
     text-decoration: none !important;
     width: 50px;
     height: 50px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     margin-right: 10px;
     font-size: 22px;
     overflow: hidden;
     position: relative;
     color: #fcd535; //or change to your own color
     border: 2px solid #fcd535; //or change to your own color
     transition: all 0.2s linear 0s;

     i {
       position: relative;
       z-index: 3;
     }
     
     &:last-child {
       margin-right: 0px;
     }
     
     &:before {
       content: "";
       display: inline-block;
       height: 100%;
       vertical-align: middle;
     }
     
     i {
       display: inline-block;
       vertical-align: middle;
     }

     &:after {
       content: "";
       display: block;
       width: 90%;
       height: 90%;
       top: -110%;
       left: 0;
       right: 0;
       margin: auto;
       position: absolute;
       background-color: #212121;
       border-radius: 50%;
     }
     
     &:hover {
       color: #fff;
       
       &:after {
         top: 5%;
         transition: all 0.2s linear 0s;
       }
     }
   }      
 }
 

/* varrius effect */
.effect {
 a {
   transition: all 0.2s linear 0s;
   
   &:after {
     content: "";
     display: block;
     width: 90%;
     height: 90%;
     top: -110%;
     left: 0;
     right: 0;
     margin: auto;
     position: absolute;
     background-color: #212121;
     border-radius: 50%;
   }
   
   &:hover {
     color: #fff;
     
     &:after {
       top: 5%;
       transition: all 0.2s linear 0s;
     }
   }
 }
}
`

const Footer = () => {
  const { t } = useTranslation()

  return (
    <>
      <Wrapper>
        <Text textAlign="center" color="textSubtle" mt="40px" >
          {t('Connect your crypto wallet to start using the app in seconds.')}
        </Text>
        <Link external href="https://docs.morebnb.finance">
          {t('Learn how to start')}
        </Link>
        {/* <SocialsBox>
            <div className="effect">
            <div className="buttons">
                <Link aria-label="twitter" href="https://twitter.com/NftUsc" className="tw" title="Join us on Twitter"><i className="fab fa-twitter" aria-hidden="true" /></Link>
                <Link aria-label="discord" href="https://discord.gg/2eSM7ZhBDe" className="discord" title="Join us on Discord"><i className="fab fa-discord" aria-hidden="true" /></Link>
                <Link aria-label="telegram" href="https://t.me/MoreUniverse" className="te" title="Join us on Telegram"><i className="fab fa-telegram" aria-hidden="true" /></Link>
                <Link aria-label="medium" href="https://medium.com/@contactuscnft/ultimate-solana-championship-3cd829bcbd22" className="medium" title="Join us on Medium"><i className="fab fa-medium" aria-hidden="true" /></Link>
            </div>
            </div>
        </SocialsBox> */}
      </Wrapper>
    </>
  )
}

export default Footer
