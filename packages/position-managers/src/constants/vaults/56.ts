import { Percent } from '@pancakeswap/sdk'
import { bscTokens } from '@pancakeswap/tokens'
import { FeeAmount } from '@pancakeswap/v3-sdk'

import { ManagerFeeType, Strategy, VaultConfig } from '../../types'
import { MANAGER } from '../managers'

export const vaults: VaultConfig[] = [
  {
    id: 1,
    name: 'ICHI',
    address: '0x7fcBe3DDc2e6BD069eb5f11374DCA99f00685189',
    adapterAddress: '0x7F9ECfe70996aE6b65f93EF831E6037B8381BeD7',
    lpAddress: '0x63652e66Abd23d02537759f03314c333921915E1',
    rewardPerSecond: '100000000000000',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.usdt,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    managerFee: {
      type: ManagerFeeType.LP_REWARDS,
      rate: new Percent(1, 100),
    },
    manager: MANAGER.ICHI,
    isSingleDepositToken: true,
    allowDepositToken0: true,
    allowDepositToken1: false,
    priceFromV3FarmPid: 3,
    managerInfoUrl: 'https://google.com/',
    strategyInfoUrl: 'https://google.com/',
    projectVaultUrl: 'https://google.com/',
    endTimestamp: 1735686000,
  },
  {
    id: 2,
    name: 'ICHI',
    address: '0xF7B31BFECBA26C7F6097B3431A1a06a93F9805a2',
    adapterAddress: '0xF7B31BFECBA26C7F6097B3431A1a06a93F9805a2',
    lpAddress: '0x36696169C63e42cd08ce11f5deeBbCeBae652050',
    rewardPerSecond: '100000000000000',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.YIELD_IQ,
    managerFee: {
      type: ManagerFeeType.LP_REWARDS,
      rate: new Percent(1, 100),
    },
    manager: MANAGER.ICHI,
    isSingleDepositToken: true,
    allowDepositToken0: true,
    allowDepositToken1: false,
    priceFromV3FarmPid: 5,
    managerInfoUrl: 'https://google.com/',
    strategyInfoUrl: 'https://google.com/',
    projectVaultUrl: 'https://google.com/',
    endTimestamp: 1735686000,
  },
  {
    id: 3,
    name: 'ICHI',
    address: '0x889c921AA90D7cca50E04a580b54c8c35e105949',
    adapterAddress: '0x799dED74DB237452Ce87f67FD253f8B7C71dB135',
    lpAddress: '0x133B3D95bAD5405d14d53473671200e9342896BF',
    rewardPerSecond: '100000000000000',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.wbnb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.MEDIUM,
    strategy: Strategy.YIELD_IQ,
    managerFee: {
      type: ManagerFeeType.LP_REWARDS,
      rate: new Percent(1, 100),
    },
    manager: MANAGER.ICHI,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    priceFromV3FarmPid: 1,
    managerInfoUrl: 'https://google.com/',
    strategyInfoUrl: 'https://google.com/',
    projectVaultUrl: 'https://google.com/',
    endTimestamp: 1735686000,
  },
  {
    id: 4,
    name: 'ICHI',
    address: '0x18Cb54226889a0794Caa0dB46BDb0177B77A55b7',
    adapterAddress: '0xc8b0A3834a3bfDee67B22A65Df32eBE325bdCfe2',
    lpAddress: '0x46Cf1cF8c69595804ba91dFdd8d6b960c9B0a7C4',
    rewardPerSecond: '100000000000000',
    currencyA: bscTokens.usdt,
    currencyB: bscTokens.btcb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.YIELD_IQ,
    managerFee: {
      type: ManagerFeeType.LP_REWARDS,
      rate: new Percent(1, 100),
    },
    manager: MANAGER.ICHI,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    priceFromV3FarmPid: 7,
    managerInfoUrl: 'https://google.com/',
    strategyInfoUrl: 'https://google.com/',
    projectVaultUrl: 'https://google.com/',
    endTimestamp: 1735686000,
  },
  {
    id: 5,
    name: 'ICHI',
    address: '0x1D94f33eFA5eeD0C97F0384adcF16d852970c374',
    adapterAddress: '0xdD60FB668f3a6a03BD90874C80b914eAeC82ccca',
    rewardPerSecond: '100000000000000',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.btcb,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.YIELD_IQ,
    managerFee: {
      type: ManagerFeeType.LP_REWARDS,
      rate: new Percent(1, 100),
    },
    manager: MANAGER.ICHI,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://google.com/',
    strategyInfoUrl: 'https://google.com/',
    projectVaultUrl: 'https://google.com/',
    endTimestamp: 1735686000,
  },
  {
    id: 6,
    name: 'ICHI',
    address: '0xCEf0f685766319f6Fe78fEd3C0Fe1D2ad8E55DeA',
    adapterAddress: '0x03Bd52715440D9D91B88d2CC7533812E32FC8a71',
    rewardPerSecond: '100000000000000',
    currencyA: bscTokens.cake,
    currencyB: bscTokens.eth,
    earningToken: bscTokens.cake,
    feeTier: FeeAmount.LOW,
    strategy: Strategy.YIELD_IQ,
    managerFee: {
      type: ManagerFeeType.LP_REWARDS,
      rate: new Percent(1, 100),
    },
    manager: MANAGER.ICHI,
    isSingleDepositToken: true,
    allowDepositToken0: false,
    allowDepositToken1: true,
    managerInfoUrl: 'https://google.com/',
    strategyInfoUrl: 'https://google.com/',
    projectVaultUrl: 'https://google.com/',
    endTimestamp: 1735686000,
  },
]
