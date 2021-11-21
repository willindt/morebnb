import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Dashboard'),
    icon: 'HomeIcon',
    href: '/',
  },
  // {
  //   label: t('Trade'),
  //   icon: 'TradeIcon',
  //   items: [
  //     {
  //       label: t('Exchange'),
  //       href: 'https://pancakeswap.finance/swap?outputCurrency=0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
  //     },
  //     {
  //       label: t('Liquidity'),
  //       href: 'https://pancakeswap.finance/add/BNB/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
  //     },
  //   ],
  // },
  // {
  //   label: t('Farms'),
  //   icon: 'FarmIcon',
  //   href: '/farms',
  // },
  // {
  //   label: t('Pools'),
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: t('Referral'),
  //   icon: 'GroupsIcon',
  //   href: '/referral',
  // },
  // {
  //   label: t('Prediction (BETA)'),
  //   icon: 'PredictionsIcon',
  //   href: '/prediction',
  // },
  // {
  //   label: t('Jackpot'),
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: t('Games'),
  //   icon: 'PredictionsIcon',
  //   href: '/games',
  // },
  // {
  //   label: t('NFTs'),
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: t('Launchpad'),
  //   icon: 'IfoIcon',
  //   href: '/launchpad',
  // },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('DexGuru'),
        href: 'https://dex.guru/token/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61-bsc',
      },
      {
        label: t('PooCoin'),
        href: 'https://poocoin.app/tokens/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
      },
      {
        label: t('Dextools'),
        href: 'https://www.dextools.io/app/bsc/pair-explorer/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
      },
      {
        label: t('BSCscan'),
        href: 'https://bscscan.com/token/0x20b9ffD06d32eAee94eDcd9098db01B2d13d4C61',
      },
    ],
  },
  // {
  //   label: t('More'),
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: t('Github'),
  //       href: 'https://github.com/daughterdoge',
  //     },
  //     {
  //       label: t('Docs'),
  //       href: 'https://daughterdoge.finance/docs',
  //     },
  //     {
  //       label: t('News'),
  //       href: 'https://medium.com/@daughterdoge',
  //     },
  //   ],
  // }
]

export default config
