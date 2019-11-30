import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {NavigationEvents} from 'react-navigation';

export default class Nosuscripciones extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentImage}>
          <Image
            style={styles.img}
            source={require('../../../assets/img/banner-suscripciones.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentText}>
          <Text style={styles.title}>¿Aún no tienes suscripciones?</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.props.navigation.navigate('Oracionales')}>
            <Text style={styles.btnText}> Suscríbete Ya!</Text>
          </TouchableOpacity>
          {/* <Text style={styles.title}>Ya tengo suscripciones</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.getLogin()}>
            <Text style={styles.btnText}> Continuar </Text>
          </TouchableOpacity> */}
        </View>
        <NavigationEvents
          onWillFocus={payload => this.props.getLogin()}
          // onDidFocus={payload => this.props.getLogin()}
          // onWillBlur={payload => console.log('will blur', payload)}
          // onDidBlur={payload => console.log('did blur', payload)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center"
    // borderColor: "green",
    // borderWidth: 1
  },
  contentImage: {
    flex: 1,
    alignItems: 'center',
    // borderColor: "red",
    // borderWidth: 1
  },
  title: {
    margin: 10,
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
  },
  img: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 1
  },
  contentText: {
    flex: 1,
    alignItems: 'center',
    // borderColor: "red",
    // borderWidth: 1
  },
  btn: {
    backgroundColor: '#280C54',
    borderRadius: 33,
    padding: 10,
    width: 250,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
