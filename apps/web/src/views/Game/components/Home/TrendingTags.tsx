import { styled } from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, Box, Text, Button } from '@pancakeswap/uikit'

export const StyledTag = styled(Button)<{ isPurple?: boolean }>`
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 400;
  box-shadow: 0px 0px 1px 0px #757575;
  border: ${({ theme, isPurple }) => `solid 1px ${isPurple ? theme.colors.secondary : theme.colors.textSubtle}`};
  color: ${({ theme }) => theme.colors.textSubtle};
  background-color: ${({ theme, isPurple }) => (isPurple ? theme.colors.secondary : theme.card.background)};
`

const StyledTagContainer = styled(Flex)`
  flex-wrap: wrap;
  ${StyledTag} {
    margin: 8px 4px 0 0;
  }
`

export const TrendingTags = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Text fontSize={12} textTransform="uppercase">
        {t('trending tags for this game:')}
      </Text>
      <StyledTagContainer>
        <StyledTag scale="sm">PvP</StyledTag>
        <StyledTag scale="sm">Strategy</StyledTag>
        <StyledTag scale="sm">Pancake Squad</StyledTag>
        <StyledTag scale="sm">Pancake Bunnies</StyledTag>
        <StyledTag scale="sm">Tower Defense</StyledTag>
      </StyledTagContainer>
    </Box>
  )
}
