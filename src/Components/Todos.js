import React from 'react'
import { Text ,View,StyleSheet} from 'react-native'
import { TextInput,Button } from 'react-native-paper';

export const Todos = ({todoTask}) => {

  return (
    <View>
        <Text>{todoTask}</Text>
    </View>
  )
}
