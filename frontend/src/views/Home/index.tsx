import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie';
import { useQueryParam, StringParam } from 'use-query-params';
import { Text, Image } from '@pancakeswap/uikit'
import { TokenUpdater } from 'state/info/updaters'
import Page from 'components/Layout/Page'

import CurrentStatus from 'views/Home/components/CurrentStatus'
import ButtonGroup from 'views/Home/components/ButtonGroup'
import About from 'views/Home/components/About'
import Footer from 'views/Home/components/Footer'
import { useTranslation } from 'contexts/Localization'
import { isAddress } from '../../utils/web3'
import rot13 from '../../utils/encode'

const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  padding-top: 20px;
  text-align: center;
`

const Home: React.FC = () => {
  
  const { t } = useTranslation()
  const cookies = new Cookies();
  const [ref, setNum] = useQueryParam('ref', StringParam);

  if(ref) {
    if(isAddress(rot13(ref))) {
      cookies.set("ref", ref)
    }
  }

  return (
    <Page>
      <Hero>
        <Image src="images/header.png" width={400} height={237}/>
        <Text fontSize="22px" color="textSubtle" textAlign="center">
          {t('Experimental Yield Farm on Binance Smart Chain')}
        </Text>
        <Text fontSize="22px" color="textSubtle" textAlign="center" mb="20px">
          {t('Daily Interest Upto 8%')}
        </Text>
      </Hero>
      <div>
          <TokenUpdater />
          <CurrentStatus />
          <ButtonGroup />
          <About />
          <Footer />
      </div>
    </Page>
  )
}

export default Home
