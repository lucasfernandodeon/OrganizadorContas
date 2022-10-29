import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Alert, } from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useRoute } from '@react-navigation/native';

const BillSList = () => {

  const navigation = useNavigation();
  const route = useRoute();


  const [bills, setBills] = useState([])

  const searchBills = () => {
    axios.get('http://192.168.0.160:3000/bill').then((result) => {
      setBills(result.data);
    })
  }
  const deleteBill = (id) => {
    axios.delete('http://192.168.0.160:3000/bill/' + id).then(() => {
      searchBills()
    });
  }

  useEffect(() => searchBills(), [route.params?.res])



  return (
    <View style={{ flex: 1 }}>
      
      <SwipeListView
        data={bills}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Visualizar conta', { data: item })}>

            <View style={styles.containerViewStyle}>
              <Icon name="file" size={30} color="black" style={styles.iconStyle} />
              <View style={styles.viewDataStyle}>

                <Text style={styles.textStyle}>{item.name.toUpperCase()}</Text>
                <View style={styles.rowViewStyle}>
                  <Text style={styles.boldTextStyle}>
                    Recebedor:
                  </Text>
                  <Text style={styles.textStyle}>
                    {item.taker}
                  </Text>
                </View>
                <View style={styles.rowViewStyle}>
                  <Text style={styles.boldTextStyle}>
                    Valor:
                  </Text>
                  <Text style={styles.textStyle}>
                     R$:{item.value.toFixed(2).replace(".", ",")} 
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.actionsViewStyle}>
            <TouchableOpacity style={styles.deleteButtonStyle} onPress={ () =>
    Alert.alert(
      "Alerta",
      "Deseja remover a conta ?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Remover", onPress: () => deleteBill(item.id) }
      ]
    )
              
              }>
              <Icon name="trash" size={30} color="white" style={styles.iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateButtonStyle}
              onPress={() => navigation.navigate('Cadastrar/Atualizar conta', { data: item })} >
              <Icon name="pencil" size={30} color="white" style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={70}
      />
      

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastrar/Atualizar conta')}
        style={styles.addButtonStyle}>
        <Icon name="plus" size={30} color="white" style={styles.iconStyle} />
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
 
  containerViewStyle: {
    flexDirection: "row",
    backgroundColor: '#E0E0E0',
    borderColor: "black",
    borderWidth: 1,
    margin: 1
  },
  rowViewStyle: {
    flexDirection: "row"
  },
  textStyle: {
    color: "black"
  },
  boldTextStyle: {
    color: "black",
    fontWeight: "bold"
  },
  iconStyle: {
    padding: 5,
    alignSelf: "center"
  },
  actionsViewStyle: {
    flexDirection: "row",
    margin: 1
  },
  viewDataStyle: {
    marginBottom: 5,
    flexDirection: 'column',
    padding: 5,
  },
  deleteButtonStyle: {
    backgroundColor: "red",

  },
  updateButtonStyle: {
    backgroundColor: "green",

  },

  addButtonStyle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'blue',
    position: 'absolute',
    justifyContent: "center",
    bottom: 10,
    right: 10,
  },
});
export default BillSList;