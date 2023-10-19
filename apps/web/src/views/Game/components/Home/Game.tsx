import { styled } from 'styled-components'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Flex, Box, Text, Button, CardHeader, Link, Card, TelegramIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { Carousel } from 'views/Game/components/Home/Carousel'
import { CarouselView } from 'views/Game/components/Home/CarouselView'
import { TrendingTags, StyledTag } from 'views/Game/components/Home/TrendingTags'
import { carouselData } from '../mockData'

const StyledGameContainer = styled(Flex)<{ isHorizontal: boolean }>`
  width: 100%;
  margin: auto;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.xxl} {
    width: ${({ isHorizontal }) => (isHorizontal ? '1101px' : '948px')};
  }
`

const StyledGameInfoContainer = styled(Box)`
  background: ${({ theme }) => theme.colors.gradientBubblegum};
`

const StyledGameInformation = styled(Flex)`
  width: 100%;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 32px;
    width: 467px;
  }
`

const Header = styled(CardHeader)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 67px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: ${({ theme }) => theme.colors.dropdown};
  background-image: url('/images/ifos/sable-bg.png');
  ${({ theme }) => theme.mediaQueries.md} {
    height: 112px;
  }
`

const StyledLeftContainer = styled(Box)<{ isHorizontal: boolean }>`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: ${({ isHorizontal }) => (isHorizontal ? '671px' : '392px')};
  }
`

const StyledTextLineClamp = styled(Text)<{ lineClamp: number }>`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lineClamp }) => lineClamp};
`

interface GameProps {
  isLatest?: boolean
  isHorizontal: boolean
}

export const Game: React.FC<React.PropsWithChildren<GameProps>> = ({ isLatest, isHorizontal }) => {
  const { t } = useTranslation()
  const { isDesktop, isXxl } = useMatchBreakpoints()
  const [carouselId, setCarouselId] = useState(0)
  const fakeDate = JSON.parse(JSON.stringify(carouselData))

  const previewCarouseData = useMemo(() => fakeDate[carouselId], [carouselId, fakeDate])

  return (
    <StyledGameContainer isHorizontal={isHorizontal}>
      {isLatest && isDesktop && (
        <Flex flexDirection="column" mb="32px">
          <Box margin="auto">
            <Image width={59} height={64} alt="flagship-game" src="/images/game/home/flagship-game.png" />
          </Box>
          <Flex justifyContent="center">
            <Text as="span" bold fontSize={['40px']} color="secondary">
              Flagship
            </Text>
            <Text as="span" ml="8px" bold fontSize={['40px']}>
              Game
            </Text>
          </Flex>
        </Flex>
      )}
      <Card>
        <Header />
        <StyledGameInfoContainer
          padding={['0 20px 20px 20px', '0 20px 20px 20px', '0 20px 20px 20px', '0 20px 20px 20px', '0 32px 32px 32px']}
        >
          <Flex
            width="100%"
            paddingTop={['32px']}
            justifyContent="space-between"
            flexDirection={[
              'column-reverse',
              'column-reverse',
              'column-reverse',
              'column-reverse',
              'column-reverse',
              'row',
            ]}
          >
            <StyledLeftContainer isHorizontal={isHorizontal}>
              <Box height="100%" mb={['16px', '16px', '16px', '16px', '16px', '0']}>
                <CarouselView isHorizontal={isHorizontal} carouselData={previewCarouseData} />
                {((!isHorizontal && !isXxl) || isHorizontal) && (
                  <Carousel
                    carouselId={carouselId}
                    carouselData={fakeDate}
                    isHorizontal={isHorizontal}
                    setCarouselId={setCarouselId}
                  />
                )}
              </Box>
              {!isXxl && <TrendingTags />}
            </StyledLeftContainer>
            <StyledGameInformation>
              <Text bold lineHeight="110%" fontSize={['32px', '32px', '32px', '32px', '32px', '40px']}>
                Pancake Protectors
              </Text>
              <StyledTextLineClamp
                bold
                lineClamp={2}
                color="secondary"
                lineHeight="110%"
                fontSize={['20px', '20px', '20px', '20px', '20px', '24px']}
                m={['12px 0', '12px 0', '12px 0', '12px 0', '12px 0', '24px 0']}
              >
                Unlock the Power of CAKE and Perks for Pancake Squad and Bunnies Holders
              </StyledTextLineClamp>
              <StyledTextLineClamp
                lineClamp={3}
                lineHeight="120%"
                mb={['32px', '32px', '32px', '32px', '32px', '24px']}
              >
                PancakeSwap and Mobox joined forces to launch a tower-defense and PvP game tailored for GameFi players,
                as well as CAKE, Pancake Squad, and Bunnies holders.
              </StyledTextLineClamp>
              <Flex justifyContent="space-between" mb={['32px', '32px', '32px', '32px', '32px', '24px']}>
                <StyledTag scale="xs" isPurple style={{ alignSelf: 'center' }}>
                  <Text fontSize={14} color="white">
                    Genera:
                  </Text>
                  <Text fontSize={14} bold ml="4px" color="white">
                    Defense
                  </Text>
                </StyledTag>
                <Flex>
                  <Flex flexDirection={['column', 'column', 'column', 'column', 'column', 'row']} mr="4px">
                    <Text
                      bold
                      fontSize={12}
                      color="textSubtle"
                      textTransform="uppercase"
                      textAlign={['right', 'right', 'right', 'right', 'left']}
                    >
                      Published by
                    </Text>
                    <Text
                      bold
                      fontSize={12}
                      color="secondary"
                      textTransform="uppercase"
                      m={['0', '0', '0', '0 0 0 4px']}
                      textAlign={['right', 'right', 'right', 'right', 'left']}
                    >
                      dev_name
                    </Text>
                  </Flex>
                  <Link external href="/">
                    <TelegramIcon color="secondary" />
                  </Link>
                </Flex>
              </Flex>
              <Link external href="/" width="100% !important" mb={['32px', '32px', '32px', '32px', '32px', '49px']}>
                <Button width="100%">
                  <Text bold color="white">
                    {t('Play Now')}
                  </Text>
                </Button>
              </Link>

              {isXxl && !isHorizontal && (
                <Carousel
                  carouselId={carouselId}
                  carouselData={fakeDate}
                  isHorizontal={isHorizontal}
                  setCarouselId={setCarouselId}
                />
              )}

              {isXxl && <TrendingTags />}
            </StyledGameInformation>
          </Flex>
        </StyledGameInfoContainer>
      </Card>
    </StyledGameContainer>
  )
}
