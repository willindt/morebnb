import React from 'react'
import { Link, Text, Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const ButtonSection = styled.div`
  align-items: center;
  text-align: center;
  margin: auto;
  max-width: 742px;
`

const BlockButton = styled(Button)`
  display: block;
  margin: auto;
  height: 56px;
  padding: 0;
  margin-top: 10px;
  width: 50%;
  @media (max-width: 742px) {
    width: 80%;
  }
  @media (max-width: 523px) {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const ButtonGroup = () => {
  const {t} = useTranslation()

  return (
    <ButtonSection>
      <BlockButton scale="md">
      <StyledLink mr="16px" href="/dashboard">
        <Text color="background">{t('Dashboard')}</Text>
      </StyledLink>
      </BlockButton>

      <BlockButton scale="md" >
      <StyledLink mr="16px" href="https://docs.morebnb.finance" external>
        <Text color="background">{t('Information')}</Text>
      </StyledLink>
      </BlockButton>

      <BlockButton scale="md">
      <StyledLink mr="16px" href="https://bscscan.com/address/0xAC0f7E47c8BC00feEe5B71F8d9d39dB08785fAD3#code" external>
        <Text color="background">{t('Verified Contract')}</Text>
      </StyledLink>
      </BlockButton>
    
      <BlockButton scale="md">
      <StyledLink mr="16px" href="https://t.me/MoreUniverse" external>
        <Text color="background">{t('Telegram')}</Text>
      </StyledLink>
      </BlockButton>
      
      <Text mt="70px" fontSize="24px">
        {t('Start your yield farm journey')}
      </Text>
      <Text fontSize="24px">
        {t('with More BNB community')}
      </Text>
    </ButtonSection>
  )
}

export default ButtonGroup
