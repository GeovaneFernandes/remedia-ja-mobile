import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CaregiverMedicationsScreen } from '../screens/CaregiverMedicationsScreen';
import { MedicationFormScreen } from '../screens/MedicationFormScreen';

// Navegação do cuidador. A tela de alarme do idoso (ElderlyAlarmScreen) é
// apresentada fora deste stack, disparada pela notificação em primeiro
// plano — ver App.tsx.
export type RootStackParamList = {
  Login: undefined;
  Medications: undefined;
  NewMedication: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen as any} options={{ title: 'Entrar' }} />
        <Stack.Screen name="Medications" component={CaregiverMedicationsScreen as any} options={{ title: 'Remédios' }} />
        <Stack.Screen name="NewMedication" component={MedicationFormScreen as any} options={{ title: 'Novo remédio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
