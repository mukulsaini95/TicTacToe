import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'

const Square = ({ item, index, onPressHandler,style }) => {
  const { Common, Fonts, Gutters, darkMode } = useTheme()

  const onTapHandler = () => {
    onPressHandler(index)
  }

  return (
    <TouchableOpacity
      style={[
        Gutters.smallHPadding,
        Gutters.smallVPadding,
        {
          flexBasis: '33%',
          height: '25%',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: Fonts.textRegular.color,
          alignContent: 'space-between',
          marginTop : index > 2 ? 3:0
        },
      ]}
      onPress={onTapHandler}
      key={index}
    >
      <Text
        style={[
          {
            ...Fonts.textRegular,
            fontSize: 50,
            color: item === 'X' ? 'red' : darkMode ? 'white' : 'black',
            ...style
          },
        ]}
      >
        {item ?? ''}
      </Text>
    </TouchableOpacity>
  )
}

export default Square
