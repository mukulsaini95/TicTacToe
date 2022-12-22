import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'game',
  initialState: { isComputer: null, player: null },
  reducers: {
    setPlayType: (state, { payload: { isComputer } }) => {
      console.log('isComputer: ', isComputer);
      state.isComputer = isComputer?.toString()
      return state
    },
    setPlayer: (state, { payload: { player } }) => {
      state.player = player?.toString()
      return state
    },
  },
})

export const { setPlayType, setPlayer } = slice.actions

export default slice.reducer
