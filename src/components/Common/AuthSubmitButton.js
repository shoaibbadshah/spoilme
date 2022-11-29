import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MyText } from './MyText';
import * as Progress from 'react-native-progress';

export const AuthSubmitButton = ({ text, onPress, disabled, loading }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor: !disabled ? '#FF8112' : 'rgba(200,200,200,0.5)' },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {!loading ? (
        <MyText text={text} color="white" textAlign="center" />
      ) : (
        <Progress.Circle
          indeterminate
          size={30}
          style={{ alignSelf: 'center' }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 20,
    backgroundColor: '#FF8112',
  },
});
