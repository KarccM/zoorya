import React from 'react'
import { Text, View } from 'react-native'
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)

export default () => {
  return (
    <StyledView className='justify-center items-center flex-1'>
      <StyledText className="text-3xl text-red-700">Profile</StyledText>
    </StyledView>
  );
}