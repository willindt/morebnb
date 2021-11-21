import React, { useState, useCallback } from 'react'
import { AutoRenewIcon, Card, CardBody, Heading, Text, Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO, ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
import useTokenBalance from 'hooks/useTokenBalance'
import { useClaimable, useCanSwap } from 'hooks/useDividend'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { getCakeAddress, getOldShivaAddress } from 'utils/addressHelpers'
import { useOldShiva, useExchange } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useTranslation } from 'contexts/Localization'
// import { exchangeNew } from 'utils/calls/claim'
import ApproveConfirmButtons, { ButtonArrangement } from 'views/Profile/components/ApproveConfirmButtons'
import Balance from 'components/Balance'

const StyledTwitterCard = styled(Card)`
  min-height:300px;
  margin-top:20px;
`

const CustomCardBody = styled(CardBody)`
  margin-top:10px;
  min-height:300px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  margin: 20px 0;
`

const RowEnd = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`

const GetNewShiva = () => {
  const { account } = useWeb3React()
  const {t} = useTranslation()
  const { toastSuccess, toastError } = useToast()

  const { callWithGasPrice } = useCallWithGasPrice()

  const { balance: oldBalance } = useTokenBalance(getOldShivaAddress())
  const oldAmount = oldBalance ? getBalanceNumber(oldBalance) : 0
  const { balance: newBalance } = useTokenBalance(getCakeAddress())
  const newAmount = newBalance ? getBalanceNumber(newBalance) : 0

  const exchangeContract = useExchange()
  const oldShivaContract = useOldShiva()
  const isAllowed = useClaimable()
  const canSwap = useCanSwap()

  const { isApproving, isApproved, isConfirming, isConfirmed, handleApprove, handleConfirm } =
  useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await oldShivaContract.allowance(account, exchangeContract.address)
        const currentAllowance = ethersToBigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return callWithGasPrice(oldShivaContract, 'approve', [exchangeContract.address, ethers.constants.MaxUint256])
    },
    onApproveSuccess: async () => {
      toastSuccess(t('Contract enabled - you can now exchange your tokens'))
    },
    onConfirm: () => {
      if(canSwap) {
        return callWithGasPrice(exchangeContract, 'exchange')
      }
      // toastError(t('Cannot Harvest until Lockup ends!'))
      return null
    },
    onSuccess: async () => {
      toastSuccess(t('You got new tokens!'))
    },
  })

  return (
    <StyledTwitterCard>
      <CustomCardBody>
        <Heading size="xl" mb="24px">
          {t('Get New ShivaToken')}
        </Heading>
        {oldAmount ? 
        <Row>
          <Text color="primary" bold ml="10px" mr="10px" fontSize="28px">
            {t('Old SHIVA Balance:')}
          </Text>
          <Balance
            decimals={oldAmount ? 3 : 0}
            fontSize="24px"
            bold
            lineHeight="1.1"
            value={oldAmount}
          />
        </Row> : null}
        <Row>
          <Text color="primary" bold ml="10px" mr="10px" fontSize="28px">
            {t('New SHIVA Balance:')}
          </Text>
          <Balance
            decimals={newAmount ? 3 : 0}
            fontSize="24px"
            bold
            lineHeight="1.1"
            value={newAmount}
          />
        </Row>
        {oldAmount ? 
        <RowEnd>
          {isAllowed ? 
          <ApproveConfirmButtons
            isApproveDisabled={isApproved}
            isApproving={isApproving}
            isConfirmDisabled={!canSwap}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
            buttonArrangement={ButtonArrangement.SEQUENTIAL}
            confirmLabel={t('Exchange')}
          /> : 
          <Text color="secondary" bold ml="10px" mr="10px" fontSize="28px">
            {t('You are not allowed to exchange with new SHIVA')}
          </Text>
          }
        </RowEnd> :
        <Heading size="xxl" mb="24px" ml="10px">
          {t('You have no Old SHIVA token...')}
        </Heading> }
      </CustomCardBody>
    </StyledTwitterCard>
  )
}

export default GetNewShiva
