import BigNumber from 'bignumber.js'
import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { Modal, Flex, useModal, FlexProps, Text, IconButton, CalculateIcon, Box } from '@pancakeswap/uikit'
import { ModalInput } from 'components/Modal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
// import useToast from 'hooks/useToast'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'

interface StakeInnerProps extends FlexProps {
  days?: string
  pdaily?: number
  pid?: number
  total?: number
}

const StyledModal = styled(Modal)`
  width: 565px;
  & > :nth-child(2) {
    padding: 0;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`

const StyledTable = styled.table`
  width: 90%;
  margin: auto;
`

const TableHead = styled.thead`
    border-bottom: 1px solid #dee2e6!important;
`

const StyleTh = styled.th`
    padding: 15px 20px;
    vertical-align: middle;
`;

const TableBody = styled.tbody`
  & tr {
    td {
      padding: 15px 20px;
      font-size: 16px;
      vertical-align: middle;
      text-align: center;
    }
  }
`

const StakeInner: React.FC<StakeInnerProps> = ({ days, pdaily, pid, total }) => {
  const [expected, setExpected] = useState(0)
  const [val, setVal] = useState('')

  const [showRoiCalculator, setShowRoiCalculator] = useState(false)
  const { t } = useTranslation()
  const { balance : bnbbalance } = useGetBnbBalance()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(bnbbalance)
  }, [bnbbalance])

//   const StakeAmount = new BigNumber(val)
//   const fullBalanceNumber = new BigNumber(fullBalance)

//   const usdToStake = StakeAmount.times(lpPrice)

//   const interestBreakdown = getInterestBreakdown({
//     principalInUSD: !StakeAmount.isNaN() ? usdToStake.toNumber() : 0,
//     apr,
//     earningTokenPrice: cakePrice.toNumber(),
//   })

//   const annualRoi = cakePrice.times(interestBreakdown[3])
//   const formattedAnnualRoi = formatNumber(
//     annualRoi.toNumber(),
//     annualRoi.gt(10000) ? 0 : 2,
//     annualRoi.gt(10000) ? 0 : 2,
//   )

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const [onRoi] = useModal(
    <StyledModal
      title={t('ROI Calculator')}
      onDismiss={() => setShowRoiCalculator(false)}
      onBack={() => setShowRoiCalculator(false)}
      headerBackground="gradients.cardHeader"
    >
      <Box m="24px">
        <StyledTable>
          <TableHead>
            <tr>
              <StyleTh><Text>{t('Days')}</Text></StyleTh>
              <StyleTh><Text>{t('ROI')}</Text></StyleTh>
              <StyleTh><Text>{t('Income Per')}</Text><Text mt="-5px">{t('Per 1 BNB')}</Text></StyleTh>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              <td><Text>{t('1')}</Text></td>
              <td><Text>{pdaily/10}%</Text></td>
              <td><Text>{pdaily/1000}</Text></td>
            </tr>
            <tr>
              <td><Text>{t('7')}</Text></td>
              <td><Text>{(((1+ pdaily/1000) ** 7 - 1)*100).toFixed(1)}%</Text></td>
              <td><Text>{((1+ pdaily/1000) ** 7 - 1).toFixed(3)}</Text></td>
            </tr>
            <tr>
              <td><Text>{t('30')}</Text></td>
              <td><Text>{(((1+ pdaily/1000) ** 30 - 1)*100).toFixed(1)}%</Text></td>
              <td><Text>{((1+ pdaily/1000) ** 30 - 1).toFixed(3)}</Text></td>
            </tr>
            <tr>
              <td><Text>{t('90')}</Text></td>
              <td><Text>{(((1+ pdaily/1000) ** 90 - 1)*100).toFixed(1)}%</Text></td>
              <td><Text>{((1+ pdaily/1000) ** 90 - 1).toFixed(3)}</Text></td>
            </tr>
          </TableBody>
        </StyledTable>
        <Flex justifyContent="center" mt="20px">
          <Text>{t('Calculated based on compunding 1x daily')}</Text>
        </Flex>
      </Box>
    </StyledModal>,
  )

  return (
    <>
      <Flex justifyContent="space-between" flexDirection="row" width="100%" alignItems="center" mb="10px">
        <Text color="textSubtle" as="p" bold fontSize="18px">
            {t('Total Earn: %expected% BNB', {expected : (Number(val)*total/100).toFixed(3) })}
        </Text>
        <IconButton variant="text" scale="sm" onClick={onRoi}>
          <CalculateIcon color="textSubtle" width="18px" />
        </IconButton>
      </Flex>
      <ModalInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol='BNB'
          addLiquidityUrl='/'
          inputTitle={t('Stake')}
          pid={pid}
      />
    </>
  )
}

export default StakeInner