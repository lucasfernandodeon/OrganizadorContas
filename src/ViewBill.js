import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const VisualizarConta = () => {

  const route = useRoute();

  const bill = route.params.data;

  return (
    <View style={styles.viewStyle}>
      <Image source={{ uri: bill.image }} style={styles.imageStyle} />
      <View style={styles.viewLineStyle}>
        <Icon name="file" size={30} color="black" style={styles.iconStyle} />
        <Text style={[styles.textStyle, styles.boldTextStyle]}>Nome da conta: </Text>
        <Text style={styles.textStyle}>{bill.name}</Text>
      </View>
      <View style={styles.viewLineStyle}>
        <Icon name="calendar" size={30} color="black" style={styles.iconStyle} />
        <Text style={[styles.textStyle, styles.boldTextStyle]}>Data: </Text>
        <Text style={styles.textStyle}>{new Date(bill.date).toLocaleDateString()}</Text>
      </View>
      <View style={styles.viewLineStyle}>
        <Icon name="building" size={30} color="black" style={styles.iconStyle} />
        <Text style={[styles.textStyle, styles.boldTextStyle]}>Recebedor: </Text>
        <Text style={styles.textStyle}>{bill.taker}</Text>
      </View>
      <View style={styles.viewLineStyle}>
        <Icon name="money" size={30} color="black" style={styles.iconStyle} />
        <Text style={[styles.textStyle, styles.boldTextStyle]}>Valor: </Text>
        <Text style={styles.textStyle}>
         R$:{bill.value.toFixed(2).replace(".", ",")} 
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: 20,
    textAlignVertical: "center"
  },
  boldTextStyle: {
    fontWeight: "bold",
  },
  iconStyle: {
    padding: 5,
  },
  viewStyle: {
    margin: 10,

  },
  viewLineStyle: {
    flexDirection: "row",
  },
  imageStyle: {
    width: 200, height: 400, alignSelf: "center"
  }
});

export default VisualizarConta;