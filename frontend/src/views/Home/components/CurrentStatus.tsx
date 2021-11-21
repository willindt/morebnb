import React from 'react'
import { Card, CardBody, Grid, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePollCoreFarmData, usePriceBnbBusd } from 'state/farms/hooks'
import useMoreBnbInfo from 'hooks/useMorebnb'
import { BIG_ZERO } from 'utils/bigNumber'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'


const StyledCard = styled(Card)`
  margin: 15px 10px;
  margin-bottom: 0px;
  height: 173px;
  border-radius: 15px;
  & > div {
    border-radius: 15px;
    height: 170px;
  }
`

const StyledCardBody = styled(CardBody)`
  border-radius: 15px;
  height: 170px;
`

const StyleGrid = styled(Grid)`
  max-width: 742px;
  margin: auto;
  margin-bottom: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(1,minmax(0,1fr));
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }  
`

const Row = styled.div`
  align-items: center;
  display: flex;
  // justify-content: space-between;
  // margin-bottom: 8px;
`


const CurrentStatus = () => {
  usePollCoreFarmData()

  const { t } = useTranslation()
  const siteInfo = useMoreBnbInfo()
  const tDeposited = siteInfo.fetchStatus === 'success' ? getBalanceNumber(siteInfo.info._totalInvested.toString()) : 0
  const tBonus = siteInfo.fetchStatus === 'success' ? getBalanceNumber(siteInfo.info._totalBonus.toString()) : 0
  const bnbPrice = usePriceBnbBusd()
  console.log('debug->BNBprice', bnbPrice)
  const tDepositedbusd = tDeposited && bnbPrice.toString() ? bnbPrice.multipliedBy(tDeposited) : BIG_ZERO
  const tBonusbusd = tBonus && bnbPrice.toString() ? bnbPrice.multipliedBy(tBonus) : BIG_ZERO

  return (
    <StyleGrid>
        <StyledCard>
          <StyledCardBody>
            <Text fontSize="24px" mb="8px">{t('Total Value Deposited')}</Text>
            <Row>
              <CardValue fontSize="28px" decimals={3}  value={tDeposited}/>
              <Text fontSize="28px" ml="5px">BNB</Text>
            </Row>
            <Text fontSize="24px" color="textSubtle" fontStyle="italic" >~${formatAmount(tDepositedbusd.toNumber(), { notation: 'standard' })}</Text>
          </StyledCardBody>
        </StyledCard>
        <StyledCard>
          <StyledCardBody>
            <Text fontSize="24px" mb="8px">{t('Total Referral Earnings')}</Text>
            <Row>
              <CardValue fontSize="28px" decimals={3}  value={tBonus}/>
              <Text fontSize="28px" ml="5px">BNB</Text>
            </Row>
            <Text fontSize="24px" color="textSubtle" fontStyle="italic" >~${formatAmount(tBonusbusd.toNumber(), { notation: 'standard' })}</Text>
          </StyledCardBody>
        </StyledCard>
    </StyleGrid>
  )
}

export default CurrentStatus
