import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bookingscreen from '../screens/bookingscreen'
import Detailscreen from '../screens/detailscreen'
const Stack = createNativeStackNavigator();
function Homestack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Bookingscreen" component={Bookingscreen} options={{ headerShown: false }} />
                <Stack.Screen name="Detailscreen" component={Detailscreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Homestack;