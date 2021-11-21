import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { stake } from 'utils/calls/moreb'
import { useMorebnb } from 'hooks/useContract'
import { BigNumber } from 'bignumber.js'
import useToast from 'hooks/useToast'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import Cookies from 'universal-cookie';
import rot13 from 'utils/encode';
import { isAddress } from 'utils';

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
  pid?: number
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  border: none;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`


const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
  inputTitle,
  decimals = 18,
  pid,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = Number(max) < 0.05 || !max
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [pendingTx, setPendingTx] = useState(false)
  const StakeAmount = new BigNumber(value)
  const morebnbContract = useMorebnb()
  const cookies = new Cookies()
  let ref
  if(cookies.get('ref')) {
    if(isAddress( rot13(cookies.get('ref')) )) {
      ref = rot13(cookies.get('ref'))
    }
  } else {
    ref = "0x0000000000000000000000000000000000000000"
  }
  const displayBalance = (balance: string) => {
    // if (isBalanceZero) {
    //   return '0'
    // }
    const balanceBigNumber = new BigNumber(balance)
    if (balanceBigNumber.gt(0) && balanceBigNumber.lt(0.0001)) {
      return balanceBigNumber.toLocaleString()
    }
    return balanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const handleStake = async () => {
    const vaule = StakeAmount.times(10**18).toString()
    try {
      const tx = await callWithGasPrice(morebnbContract, 'invest', [ref, pid], {value: vaule})
      setPendingTx(true)
      const receipt = await tx.wait()
      // return true
      toastSuccess(t('Your funds are invested'))
      // return receipt.status
      // onSuccess(StakeAmount.toString(), receipt.transactionHash as string)
    } catch {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <Text fontSize="14px">{symbol}</Text>
          <Text fontSize="14px">{t('Balance: %balance%', { balance: displayBalance(max) })}</Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-around">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <Button scale="sm" onClick={onSelectMax} mr="8px" style={{color:'#181a20'}}>
            {t('Max')}
          </Button>
          <Button
            scale="sm"
            width="100px"
            style={{color:'#181a20'}}
            disabled={
              pendingTx || !StakeAmount.isFinite() || StakeAmount.eq(0) || StakeAmount.gt(max) || isBalanceZero || StakeAmount.lt(0.05)
            }
            onClick={handleStake}
          >
            {pendingTx ? t('Staking') : t('Stake')}
          </Button>
        </Flex>
      </StyledTokenInput>
    </div>
  )
}

export default ModalInput
