import { useTranslation } from '@pancakeswap/localization'
import { styled } from 'styled-components'
import { MANAGER } from '@pancakeswap/position-managers'
import { Address } from 'viem'
import { Currency, Percent, CurrencyAmount } from '@pancakeswap/sdk'
import {
  Button,
  CurrencyInput,
  Flex,
  ModalV2,
  RowBetween,
  Text,
  useToast,
  LinkExternal,
  Skeleton,
} from '@pancakeswap/uikit'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { useWeb3React } from '@pancakeswap/wagmi'
import { ToastDescriptionWithTx } from 'components/Toast'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import useCatchTxError from 'hooks/useCatchTxError'
import { usePositionManagerWrapperContract } from 'hooks/useContract'
import { memo, useCallback, useMemo, useState } from 'react'
import { StyledModal } from 'views/PositionManagers/components/StyledModal'
import { FeeTag } from 'views/PositionManagers/components/Tags'
import { DYORWarning } from 'views/PositionManagers/components/DYORWarning'
import { SingleTokenWarning } from 'views/PositionManagers/components/SingleTokenWarning'
import { useApr } from 'views/PositionManagers/hooks/useApr'
import { AprDataInfo } from '../hooks'

interface Props {
  manager: {
    id: MANAGER
    name: string
  }
  isOpen?: boolean
  onDismiss?: () => void
  vaultName: string
  feeTier: FeeAmount
  currencyA: Currency
  currencyB: Currency
  ratio: number
  isSingleDepositToken: boolean
  allowDepositToken0: boolean
  allowDepositToken1: boolean
  onAmountChange?: (info: { value: string; currency: Currency; otherAmount: CurrencyAmount<Currency> }) => {
    otherAmount: CurrencyAmount<Currency>
  }
  refetch?: () => void
  contractAddress: Address
  userCurrencyBalances: {
    token0Balance: CurrencyAmount<Currency> | undefined
    token1Balance: CurrencyAmount<Currency> | undefined
  }
  userVaultPercentage?: Percent
  poolToken0Amount?: bigint
  poolToken1Amount?: bigint
  token0PriceUSD?: number
  token1PriceUSD?: number
  rewardPerSecond: string
  earningToken: Currency
  aprDataInfo: {
    info: AprDataInfo | undefined
    isLoading: boolean
  }
  onAdd?: (params: { amountA: CurrencyAmount<Currency>; amountB: CurrencyAmount<Currency> }) => Promise<void>
}

const StyledCurrencyInput = styled(CurrencyInput)`
  flex: 1;
`

export const AddLiquidity = memo(function AddLiquidity({
  manager,
  ratio,
  isOpen,
  vaultName,
  currencyA,
  currencyB,
  feeTier,
  isSingleDepositToken,
  allowDepositToken1,
  allowDepositToken0,
  contractAddress,
  userCurrencyBalances,
  userVaultPercentage,
  poolToken0Amount,
  poolToken1Amount,
  token0PriceUSD,
  token1PriceUSD,
  rewardPerSecond,
  earningToken,
  aprDataInfo,
  refetch,
  onDismiss,
}: Props) {
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')
  const { t } = useTranslation()
  const tokenPairName = useMemo(() => `${currencyA.symbol}-${currencyB.symbol}`, [currencyA, currencyB])

  const onInputChange = useCallback(
    ({
      value,
      setValue,
      setOtherValue,
      isToken0,
    }: {
      value: string
      currency: Currency
      otherValue: string
      otherCurrency: Currency
      setValue: (value: string) => void
      setOtherValue: (value: string) => void
      isToken0: boolean
    }) => {
      setValue(value)
      setOtherValue((Number(value) * (isToken0 ? ratio : 1 / ratio)).toString())
    },
    [ratio],
  )

  const onCurrencyAChange = useCallback(
    (value: string) =>
      onInputChange({
        value,
        currency: currencyA,
        otherValue: valueB,
        otherCurrency: currencyB,
        setValue: setValueA,
        setOtherValue: setValueB,
        isToken0: true,
      }),
    [currencyA, currencyB, valueB, onInputChange],
  )

  const onCurrencyBChange = useCallback(
    (value: string) =>
      onInputChange({
        value,
        currency: currencyB,
        otherValue: valueA,
        otherCurrency: currencyA,
        setValue: setValueB,
        setOtherValue: setValueA,
        isToken0: false,
      }),
    [currencyA, currencyB, valueA, onInputChange],
  )

  const amountA = useMemo(
    () => tryParseAmount(valueA, currencyA) || CurrencyAmount.fromRawAmount(currencyA, '0'),
    [valueA, currencyA],
  )
  const amountB = useMemo(
    () => tryParseAmount(valueB, currencyB) || CurrencyAmount.fromRawAmount(currencyB, '0'),
    [valueB, currencyB],
  )

  const apr = useApr({
    currencyA,
    currencyB,
    poolToken0Amount,
    poolToken1Amount,
    token0PriceUSD,
    token1PriceUSD,
    rewardPerSecond,
    earningToken,
    avgToken0Amount: aprDataInfo?.info?.token0 ?? 0,
    avgToken1Amount: aprDataInfo?.info?.token1 ?? 0,
  })

  const displayBalanceText = useCallback(
    (balanceAmount: CurrencyAmount<Currency> | undefined) =>
      balanceAmount ? `Balances: ${balanceAmount?.toSignificant(6)}` : '',
    [],
  )

  const disabled = useMemo(() => {
    const balanceAmountMoreThenValueA =
      allowDepositToken0 &&
      amountA.greaterThan('0') &&
      Number(userCurrencyBalances?.token0Balance?.toSignificant()) < Number(amountA?.toSignificant())

    const balanceAmountMoreThenValueB =
      allowDepositToken1 &&
      amountB.greaterThan('0') &&
      Number(userCurrencyBalances?.token1Balance?.toSignificant()) < Number(amountB?.toSignificant())

    return amountA.equalTo('0') || amountB.equalTo('0') || balanceAmountMoreThenValueA || balanceAmountMoreThenValueB
  }, [allowDepositToken0, allowDepositToken1, amountA, amountB, userCurrencyBalances])

  return (
    <ModalV2 onDismiss={onDismiss} isOpen={isOpen}>
      <StyledModal title={t('Add Liquidity')}>
        <RowBetween>
          <Text color="textSubtle">{t('Adding')}:</Text>
          <Flex flexDirection="row" justifyContent="flex-end" alignItems="center">
            <Text color="text" bold>
              {tokenPairName}
            </Text>
            <Text color="text" ml="0.25em">
              {vaultName}
            </Text>
            <FeeTag feeAmount={feeTier} ml="0.25em" />
          </Flex>
        </RowBetween>
        {allowDepositToken0 && (
          <Flex mt="1em">
            <StyledCurrencyInput
              value={valueA}
              currency={currencyA}
              balance={userCurrencyBalances.token0Balance}
              balanceText={displayBalanceText(userCurrencyBalances?.token0Balance)}
              onChange={onCurrencyAChange}
            />
          </Flex>
        )}
        {allowDepositToken1 && (
          <Flex mt="1em">
            <StyledCurrencyInput
              value={valueB}
              currency={currencyB}
              balance={userCurrencyBalances.token1Balance}
              balanceText={displayBalanceText(userCurrencyBalances?.token1Balance)}
              onChange={onCurrencyBChange}
            />
          </Flex>
        )}
        <Flex mt="1.5em" flexDirection="column">
          <RowBetween>
            <Text color="text">{t('Your share in the vault')}:</Text>
            <Text color="text">{`${userVaultPercentage?.toFixed(2)}%`}</Text>
          </RowBetween>
          <RowBetween>
            <Text color="text">{t('APR')}:</Text>
            {apr && !aprDataInfo.isLoading ? (
              <Text color="text">{`${apr}%`}</Text>
            ) : (
              <Skeleton width={50} height={20} />
            )}
          </RowBetween>
        </Flex>
        {isSingleDepositToken && <SingleTokenWarning />}
        <DYORWarning manager={manager} />
        <Flex mt="1.5em" flexDirection="column">
          <AddLiquidityButton
            amountA={allowDepositToken0 ? amountA : undefined}
            amountB={allowDepositToken1 ? amountB : undefined}
            contractAddress={contractAddress}
            disabled={disabled}
            onDone={() => {
              onDismiss?.()
              refetch?.()
            }}
          />
        </Flex>
      </StyledModal>
    </ModalV2>
  )
})

interface AddLiquidityButtonProps {
  amountA: CurrencyAmount<Currency> | undefined
  amountB: CurrencyAmount<Currency> | undefined
  contractAddress: `0x${string}`
  disabled?: boolean
  onDone?: () => void
}

export const AddLiquidityButton = memo(function AddLiquidityButton({
  amountA,
  amountB,
  contractAddress,
  disabled,
  onDone,
}: AddLiquidityButtonProps) {
  const { t } = useTranslation()
  const { account, chain } = useWeb3React()
  const { approvalState: approvalStateToken0, approveCallback: approveCallbackToken0 } = useApproveCallback(
    amountA,
    contractAddress,
  )
  const { approvalState: approvalStateToken1, approveCallback: approveCallbackToken1 } = useApproveCallback(
    amountB,
    contractAddress,
  )
  const positionManagerWrapperContract = usePositionManagerWrapperContract(contractAddress)
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { toastSuccess } = useToast()

  const mintThenDeposit = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() =>
      positionManagerWrapperContract.write.mintThenDeposit([amountA?.numerator ?? 0n, amountB?.numerator ?? 0n, '0x'], {
        account: account ?? '0x',
        chain,
      }),
    )

    if (receipt?.status) {
      toastSuccess(
        `${t('Staked')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your funds have been staked in position manager.')}
        </ToastDescriptionWithTx>,
      )
      onDone?.()
    }
  }, [amountA, amountB, positionManagerWrapperContract, account, chain, toastSuccess, t, onDone, fetchWithCatchTxError])

  const showAmountButtonA = useMemo(
    () => amountA && approvalStateToken0 === ApprovalState.NOT_APPROVED,
    [amountA, approvalStateToken0],
  )
  const showAmountButtonB = useMemo(
    () => amountB && approvalStateToken1 === ApprovalState.NOT_APPROVED,
    [amountB, approvalStateToken1],
  )
  const isConfirmButtonDisabled = useMemo(
    () =>
      disabled ||
      (amountA && approvalStateToken0 !== ApprovalState.APPROVED) ||
      (amountB && approvalStateToken1 !== ApprovalState.APPROVED),
    [amountA, amountB, disabled, approvalStateToken0, approvalStateToken1],
  )

  return (
    <>
      {showAmountButtonA && (
        <Button
          width="100%"
          variant="primary"
          disabled={disabled || approvalStateToken0 === ApprovalState.PENDING}
          onClick={approveCallbackToken0}
        >
          {t('Approve %symbol%', { symbol: amountA?.currency?.symbol ?? '' })}
        </Button>
      )}
      {showAmountButtonB && (
        <Button
          mt="0.5em"
          width="100%"
          variant="primary"
          disabled={disabled || approvalStateToken1 === ApprovalState.PENDING}
          onClick={approveCallbackToken1}
        >
          {t('Approve %symbol%', { symbol: amountB?.currency?.symbol ?? '' })}
        </Button>
      )}
      <Button
        mt="0.5em"
        width="100%"
        variant="primary"
        isLoading={pendingTx}
        disabled={isConfirmButtonDisabled}
        onClick={mintThenDeposit}
      >
        {t('Confirm')}
      </Button>
      <LinkExternal external margin="24.5px auto 0 auto" href="https://docs.pancakeswap.finance/">
        {t('Learn more about the strategy')}
      </LinkExternal>
    </>
  )
})
