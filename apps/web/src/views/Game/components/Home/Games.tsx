import { styled } from 'styled-components'
import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, Box, Text, Button, CardHeader, Card } from '@pancakeswap/uikit'
import { StyledTextLineClamp } from 'views/Game/components/StyledTextLineClamp'

import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

const StyledCard = styled(Box)<{ picked?: boolean }>`
  position: relative;
  width: 300px;
  margin-bottom: 0;

  &:before {
    display: none;
    content: '';
    z-index: 1;
    position: absolute;
    bottom: -12px;
    left: 50%;
    width: 0px;
    height: 0px;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    transform: translateX(-50%);
    border-top: ${({ theme }) => `15px solid ${theme.colors.backgroundAlt}`};
  }

    ${({ theme }) => theme.mediaQueries.sm} {
      margin-bottom: 15px;

      &:before {
        display: ${({ picked }) => (picked ? 'block' : 'none')};
      }
    }
  }
`

const StyledContainer = styled(Flex)`
  max-width: 298px;
  margin: 0 auto 20px auto;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 630px; // 2 swiper
    margin: 0 auto 85px auto;
  }
`

const Header = styled(CardHeader)<{ imgUrl: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 112px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: ${({ theme }) => theme.colors.dropdown};
  background-image: ${({ imgUrl }) => `url('${imgUrl}')`};

  ${({ theme }) => theme.mediaQueries.md} {
    height: 200px;
  }
`

const HorizontalLogo = styled(Box)<{ imgUrl: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 73px;
  height: 27px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-image: ${({ imgUrl }) => `url('${imgUrl}')`};
`

const StyledTag = styled(Button)`
  font-weight: 400;
  width: fit-content;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.secondary};

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
    align-self: center;
  }
`

export const Games = () => {
  const { t } = useTranslation()
  const [_, setSwiper] = useState<SwiperClass | undefined>(undefined)

  return (
    <StyledContainer>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        onSwiper={setSwiper}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 34,
          },
        }}
      >
        {[1, 2].map((i) => (
          <SwiperSlide key={i}>
            <StyledCard picked={i === 1}>
              <Card>
                <Header imgUrl="/images/ifos/sable-bg.png" />
                <Box padding="20px">
                  <StyledTextLineClamp lineClamp={2} bold fontSize={20} lineHeight="110%">
                    Pancake Mayor Name of the game or promotion title here
                  </StyledTextLineClamp>
                  <StyledTextLineClamp lineClamp={3} m="20px 0" fontSize={12} color="textSubtle" lineHeight="120%">
                    Brief extract Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna alere... 140 character max.
                  </StyledTextLineClamp>
                  <Box>
                    <Text fontSize={12} color="textSubtle" bold>
                      {t('Publish Date: %date%', { date: 'MM DD, YYYY' })}{' '}
                    </Text>
                    <Text fontSize={12} color="textSubtle" bold mb="20px">
                      {t('Publisher:')}
                    </Text>
                    <Flex flexDirection={['column', 'column', 'column', 'row']} justifyContent="space-between">
                      <HorizontalLogo imgUrl="/images/ifos/sable-bg.png" />
                      <StyledTag scale="xs">Casual</StyledTag>
                    </Flex>
                  </Box>
                </Box>
              </Card>
            </StyledCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledContainer>
  )
}
