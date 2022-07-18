import React from 'react';
import { Text, View } from 'react-native';

const Roundtripscreen = () => {
  console.log('Roundtripscreen');
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Round Trip Screen
      </Text>
    </View>
  );
}

export default React.memo(Roundtripscreen);