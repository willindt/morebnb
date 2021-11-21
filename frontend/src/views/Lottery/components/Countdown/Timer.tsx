import React from 'react'
import styled from 'styled-components'
import { Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

export interface TimerProps {
  minutes?: number
  hours?: number
  days?: number
  ago? : boolean
}

const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  margin-top: -4px;
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`

const StyledTimerText = styled(Text)`
  background: ${({ theme }) => theme.colors.text};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Wrapper: React.FC<TimerProps> = ({ minutes, hours, days, ago }) => {
  const { t } = useTranslation()

  return (
    <StyledTimerFlex alignItems="flex-end">
      {Boolean(days) && (
        <>
          <StyledTimerText mb="8px" fontSize="28px" bold mr="4px">
            {days}
          </StyledTimerText>
          <StyledTimerText mb="8px" fontSize="24px" mr="12px">{t('d')}</StyledTimerText>
        </>
      )}
      {Boolean(hours) && (
        <>
          <StyledTimerText mb="8px" fontSize="28px" bold mr="4px">
            {hours}
          </StyledTimerText>
          <StyledTimerText mb="8px" fontSize="24px" mr="12px">{t('h')}</StyledTimerText>
        </>
      )}
      {Boolean(minutes) && (
        <>
          <StyledTimerText mb="8px" fontSize="28px" bold mr="4px">
            {minutes}
          </StyledTimerText>
          <StyledTimerText mb="8px" fontSize="24px" mr="12px">{t('m') }</StyledTimerText>
        </>
      )}
        <StyledTimerText mb="10px" fontSize="24px" bold mr="4px">
            {ago ? '~ago' : 'left'}    
        </StyledTimerText>
    </StyledTimerFlex>
  )
}

export default Wrapper
