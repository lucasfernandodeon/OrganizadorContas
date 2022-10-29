import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker'
import axios from "axios";
import { Bill } from './model/bill';
import { useNavigation } from '@react-navigation/native';

const CreateUpdateBill = () => {

  const route = useRoute();
  const data = route.params?.data;

  const [date, setDate] = useState(new Date())
  const [name, setName] = useState(null)
  const [taker, setTaker] = useState(null)
  const [value, setValue] = useState(null)
  const [open, setOpen] = useState(false)
  const [imageBase64, setimageBase64] = useState(null)
  const [createUpdateEnabled, setCreateUpdateEnabled] = useState(false)

  useEffect(() => {
    if (data != null) {
      setDate(new Date(data.date))
      setName(data.name)
      setTaker(data.taker)
      setValue(data.value.toString())
      setimageBase64(data.image)
      setCreateUpdateEnabled(true);
    }

  }, [])


  const navigation = useNavigation();

  const save = () => {
    axios.post('http://192.168.0.160:3000/bill',
      new Bill(null, name, date, taker, value, imageBase64)
    )
      .then((res) => navigation.navigate('Lista de contas', { res })).catch(
        () => alert('Erro ao salvar. Tente novamente.')
      )
  }

  const update = () => {
    axios.patch('http://192.168.0.160:3000/bill/' + data.id,
      new Bill(data.id, name, date, taker, value, imageBase64))
      .then((res) => navigation.navigate('Lista de contas', { res })).catch(
        () => alert('Erro ao atualizar. Tente novamente.')
      )
  }

  const manageCreateUpdateButton = () => {
    if (name == null || taker == null || imageBase64 == null || value == null) {
      setCreateUpdateEnabled(false);
    } else {
      setCreateUpdateEnabled(true);
    }
  }



  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.contentContainerStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewStyle}>
            <TouchableOpacity onPress={async () => {
              ImagePicker.launchCamera(

                options = {
                  saveToPhotos: true,
                  mediaType: 'photo',
                  includeBase64: true,
                },

              ).then((result) => {
                setimageBase64(`data:image/jpeg;base64,${result.assets[0]['base64']}`)
                manageCreateUpdateButton()
              })

            }}>
              <View style={styles.imageViewStyle}>

                {imageBase64 == null ?
                  <View style={styles.viewColumnImageStyle}>
                    <Icon name="arrow-circle-up" size={30} color="black" style={styles.iconStyle} />
                    <Text style={styles.imageTextStyle}>
                      Selecione a imagem.
                    </Text>
                  </View>

                  : <Image source={{ uri: imageBase64 }} style={styles.imageStyle} />}

              </View>

              <DatePicker
                cancelText='cancelar'
                confirmText='confirmar'
                title={"Selecione a data de pagamento."}
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                  setOpen(false)
                  setDate(date)
                }}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </TouchableOpacity>

            <TextInput placeholder='Nome' style={styles.textInputStyle}
              value={name}
              onChangeText={
                newText => {
                  setName(newText)
                  manageCreateUpdateButton()


                }} />
            <TextInput placeholder='Recebedor' style={styles.textInputStyle}
              value={taker}
              onChangeText={
                newText => {
                  setTaker(newText)
                  manageCreateUpdateButton()


                }} />
            <TextInput placeholder='Valor' style={styles.textInputStyle}

              value={value}
              keyboardType="decimal-pad"
              onChangeText={
                newText => {
                  setValue(parseFloat(newText))
                  manageCreateUpdateButton()


                }} />

            <TouchableOpacity onPress={
              () => setOpen(true)
            }>
              <View style={styles.viewDateStyle}>
                <Icon name="calendar" size={30} color="black" style={styles.iconStyle} />
                <Text style={styles.textStyle}>{date.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => {

                if (!createUpdateEnabled) {
                  return
                }

                if (data != null) {
                  update()
                } else {
                  save()
                }

              }}
              style={[styles.buttonStyle, createUpdateEnabled ? styles.enabledButtonStyle : styles.disabledButtonStyle]} >

              <Text style={styles.buttonTextStyle} >
                {data == null ? "Cadastrar" : "Atualizar"}
              </Text>

            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  scrollViewStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  viewColumnImageStyle: {
    alignItems: "center",
    flexDirection: "column",
  },
  buttonTextStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    textAlignVertical: 'center',
  },
  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  enabledButtonStyle: {
    backgroundColor: 'blue',
  },
  disabledButtonStyle: {
    backgroundColor: 'grey',
  },
  textStyle: {
    color: 'black',
    fontSize: 20,
    textAlignVertical: "center"
  },
  viewDateStyle: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 25,
  },
  imageTextStyle: {
    textAlignVertical: "center",
    textDecorationLine: 'underline',
    color: "black"

  },
  iconStyle: {
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 300,
  },
  imageViewStyle: {
    borderColor: "black",
    borderStyle: "",
    borderWidth: 1,
    width: 200,
    height: 300,
    alignSelf: "center",
    borderStyle: 'dashed',
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  textInputStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },

  viewStyle: {
    margin: 10,
    flexDirection: "column",
    flex: 1,

  },

});

export default CreateUpdateBill;