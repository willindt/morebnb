import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Card, CardHeader, CardBody, Box, BoxProps, Flex, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import StakeSection from './StakeSection'
import StakeInner from './StakeInner'

const StyledTable = styled.table`
//   border-collapse: collapse;
//   font-size: 14px;
//   border-radius: 4px;
//   margin-left: auto;
//   margin-right: auto;
  width: 90%;
  margin: auto;
`

const TableHead = styled.thead`
    border-bottom: 1px solid #dee2e6!important;
    th:last-child{
        width: 10%;
        @media (max-width: 767px) {
            width: 20%;
        }
    }
`

const StyleTh = styled.th`
    padding: 15px 20px;
`;

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const CellInner = styled.div`
  padding-top: 15px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`


interface Props extends BoxProps {
  header: string
  config: { days: string; pdaily: number; total: number; pid:number; }[]
}

const StakeCard: React.FC<Props> = ({ header, config, ...props }) => {
    const { t } = useTranslation()

  return (
    <Box maxWidth="888px" {...props}>
      <Card>
        <CardHeader>
          <Heading scale="lg" color="secondary">
            {header}
          </Heading>
        </CardHeader>
        <StyledTable>
            <TableHead>
            <tr>
                <StyleTh scope="col">
                    <CellInner>
                        <Text pb="20px">
                            {t('Days')}
                        </Text>
                    </CellInner>
                </StyleTh>
                <StyleTh scope="col">
                    <CellInner>
                        <Text textAlign="center" width="100%">
                            {t('%Daily')}
                        </Text>
                    </CellInner>
                </StyleTh>
                <StyleTh scope="col">
                    <CellInner>
                        <Text textAlign="center" width="100%">
                            {t('Total')}
                        </Text>
                    </CellInner>
                </StyleTh>
                <StyleTh scope="col">
                    <CellInner>
                        <Text textAlign="center" width="100%">
                            {t('')}
                        </Text>
                    </CellInner>
                </StyleTh>
            </tr>
            </TableHead>
            <TableBody>
              {config.map(({ days, pdaily, total, pid }, i, { length }) => (
                <StakeSection key={days} mt={i === 0 ? '24px' : ''} mb={i + 1 === length ? '' : '24px'} pid={pid} days={days} pdaily={pdaily} total={total.toString()}>
                    <StakeInner days={days} pdaily={pdaily} pid={pid} total={total}/>
                </StakeSection>
              ))}
            </TableBody>
        </StyledTable>
      </Card>
    </Box>
  )
}

export default StakeCard