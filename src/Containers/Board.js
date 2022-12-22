import React, { useState, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@/Hooks'
import { changeTheme } from '@/Store/Theme'
import { Square } from '@/Components'
import { setPlayType } from '@/Store/Game'
import { useCallback } from 'react'

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const BoardContainer = () => {
  const { Common, Fonts, Gutters, Layout, darkMode } = useTheme()
  const dispatch = useDispatch()
  const isComputer = useSelector(state => state.game.isComputer)
  const player = useSelector(state => state.game.player)
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(player)
  const [board, setBoard] = useState(new Array(9).fill(null))
  const reset = useCallback(() => {
    setBoard(new Array(9).fill(null))
    setCurrentPlayerTurn(player)
  }, [player])
  const getFontColor = player => {
    return player === 'X' ? 'red' : darkMode ? 'white' : 'black'
  }

  useEffect(() => {
    return () => {
      dispatch(setPlayType({ isComputer: null }))
    }
  }, [dispatch])

  const winnerAre = useMemo(() => {
    for (const key of winningCombination) {
      const [a, b, c] = key
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        Alert.alert(
          'Congratulations ..... ',
          !isComputer
            ? board[a] === player
              ? 'You Won'
              : 'Computer Won'
            : board[a] === player
            ? 'Player 1 Won'
            : 'Player 2 Won',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Reset', onPress: () => reset() },
          ],
        )
        return board[a]
      }
    }
    if (board.every(item => item)) {
      Alert.alert('Draw ......', 'Better luck next time', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Reset', onPress: () => reset() },
      ])
    }
    return false
  }, [board, reset, player, isComputer])

  const onChangeTheme = () => {
    dispatch(changeTheme({ darkMode: !darkMode }))
  }

  const onPressHandler = index => {
    const newBoard = [...board]
    if (!newBoard[index] && !winnerAre) {
      newBoard[index] = currentPlayerTurn

      if (!isComputer) {
        const emptySpace = []
        newBoard.filter((item, i) => {
          if (typeof item === 'object') {
            emptySpace.push(i)
          }
        })
        let randomNumber =
          emptySpace[Math.floor(Math.random() * emptySpace.length)]
        for (const key of winningCombination) {
          const [a, b, c] = key
          if (
            !newBoard[c] &&
            newBoard[a] &&
            newBoard[b] &&
            newBoard[a] === newBoard[b]
          ) {
            randomNumber = c
            break
          } else if (
            !newBoard[a] &&
            newBoard[b] &&
            newBoard[c] &&
            newBoard[b] === newBoard[c]
          ) {
            randomNumber = a
            break
          } else if (
            !newBoard[b] &&
            newBoard[a] &&
            newBoard[c] &&
            newBoard[a] === newBoard[c]
          ) {
            randomNumber = b
            break
          }
        }
        newBoard[randomNumber] = player === 'X' ? '0' : 'X'
      } else {
        setCurrentPlayerTurn(currentPlayerTurn === 'X' ? '0' : 'X')
      }
      setBoard(newBoard)
    }
  }

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <View style={[{ flex: 0.3 }, Layout.row, Layout.rowCenter]}>
        <View
          style={[
            Layout.fill,
            Layout.row,
            Layout.rowHCenter,
            { flexWrap: 'wrap' },
          ]}
        >
          <View
            style={[{ flexBasis: '95%' }, Layout.row, Gutters.smallVPadding]}
          >
            <Text style={[Fonts.textSmall]}>Selected Mode :</Text>
            <Text style={[Fonts.textSmall, Gutters.smallLPadding]}>
              {!isComputer
                ? `Player (${player}) VS Computer (${
                    player === '0' ? 'X' : '0'
                  })`
                : `Player 1 (${player}) VS Player 2 (${
                    player === '0' ? 'X' : '0'
                  })`}
            </Text>
          </View>
          <View style={[{ flexBasis: '45%' }, Layout.row]}>
            <Text style={[Fonts.textSmall, Gutters.smallRPadding]}>
              DarkMode :
            </Text>
            <Switch
              trackColor={{ false: '#000', true: '#fff' }}
              thumbColor={darkMode ? '#000' : '#fff'}
              ios_backgroundColor="#0000"
              onValueChange={onChangeTheme}
              value={darkMode}
            />
          </View>
          <Text style={[Fonts.textSmall, Gutters.smallHPadding]}>| </Text>
          <View style={[{ flexBasis: '45%' }, Layout.row]}>
            <Text style={[Fonts.textSmall]}>Player Turn : </Text>
            <Text
              style={[
                Fonts.textRegular,
                {
                  color: getFontColor(currentPlayerTurn),
                },
              ]}
            >
              {currentPlayerTurn}
            </Text>
          </View>
          <View style={[{ flexBasis: '45%' }, Layout.row]}>
            <Text style={[Fonts.textSmall]}>Winner : </Text>
            <Text
              style={[
                Fonts.textSmall,
                Gutters.smallHPadding,
                { color: 'green' },
              ]}
            >
              {board.every(item => item) ? 'Draw' : winnerAre ?? '-'}
            </Text>
          </View>
          <Text style={[Fonts.textSmall, Gutters.smallHPadding]}>| </Text>
          <View style={[{ flexBasis: '45%' }, Layout.row]}>
            <TouchableOpacity style={[Layout.alignItemsStart]} onPress={reset}>
              <Text style={[Fonts.textSmall]}>Reset </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[
          Layout.row,
          Common.backgroundPrimary,
          {
            flex: 0.7,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
        ]}
      >
        {board.map((item, index) => (
          <Square item={item} index={index} onPressHandler={onPressHandler} />
        ))}
      </View>
    </ScrollView>
  )
}

export default BoardContainer
