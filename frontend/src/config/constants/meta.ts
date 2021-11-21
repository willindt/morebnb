import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'More BNB',
  description:
    "Grow BNB with BNB.",
  image: 'https://morebnb.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Grow your BNB with BNB - Daily 8% Interest')} | ${t('More BNB')}`,
      }
    case '/dashboard':
      return {
        title: `${t('Dashboard')} | ${t('More BNB')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Shiva Token')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Shiva Token')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Shiva Token')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Shiva Token')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('Shiva Token')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Shiva Token')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Shiva Token')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('Shiva Token')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('Shiva Token')}`,
      }
    default:
      return null
  }
}
