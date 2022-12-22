import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayer, setPlayType } from '@/Store/Game'
import { Square } from '@/Components'

const playerOption = ['X', '0']
const StartupContainer = () => {
  const { Layout, Gutters, Fonts, Common, darkMode } = useTheme()
  const dispatch = useDispatch()
  const isComputer = useSelector(state => state.game.isComputer)
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()
  })

  const onPressHandler = isComputerPlay => {
    console.log('isComputerPlay: ', isComputerPlay);
    dispatch(setPlayType({ isComputer: isComputerPlay }))
  }

  const onSelectPlayer = index => {
    dispatch(setPlayer({ player: playerOption[index] }))
    navigate('Tic Tac Toe')
  }

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      {isComputer ? (
        <View style={[Layout.colCenter, Gutters.smallHPadding]}>
          <View style={[Layout.rowCenter, { flexBasis: '23%' }]}>
            {playerOption.map((item, index) => (
              <Square
                style={{ fontSize: 15 }}
                item={item}
                index={index}
                onPressHandler={onSelectPlayer}
              />
            ))}
          </View>
          <Text
            style={[
              {
                ...Fonts.textRegular,
                fontSize: 20,
                color: darkMode ? 'white' : 'black',
              },
            ]}
          >
            Select Player {isComputer ? '' : '1'}
          </Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[
              Gutters.smallHPadding,
              Gutters.smallVPadding,
              Layout.alignContent,
              Layout.justifyContent,
              {
                borderWidth: 1,
                borderColor: Fonts.textRegular.color,
              },
            ]}
            onPress={() => {
              onPressHandler(true)
            }}
          >
            <Text
              style={[
                {
                  ...Fonts.textRegular,
                  fontSize: 20,
                  color: darkMode ? 'white' : 'black',
                },
              ]}
            >
              Play vs Computer
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              Gutters.smallVPadding,
              {
                ...Fonts.textRegular,
                fontSize: 25,
                color: darkMode ? 'white' : 'black',
              },
            ]}
          >
            OR
          </Text>
          <TouchableOpacity
            style={[
              Gutters.smallHPadding,
              Gutters.smallVPadding,
              Layout.alignContent,
              Layout.justifyContent,
              {
                borderWidth: 1,
                borderColor: Fonts.textRegular.color,
              },
            ]}
            onPress={() => {
              onPressHandler(false)
            }}
          >
            <Text
              style={[
                {
                  ...Fonts.textRegular,
                  fontSize: 20,
                  color: darkMode ? 'white' : 'black',
                },
              ]}
            >
              Player 1 vs Palyer 2
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default StartupContainer
