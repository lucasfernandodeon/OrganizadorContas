import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BillList from './src/BillsList';
import ViewBill from './src/ViewBill';
import CreateUpdateBill from './src/CreateUpdateBill';


const Stack = createStackNavigator();

function OrganizacorContas() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista de contas" component={BillList} />
        <Stack.Screen name="Visualizar conta" component={ViewBill} />
        <Stack.Screen name="Cadastrar/Atualizar conta" component={CreateUpdateBill} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default OrganizacorContas;