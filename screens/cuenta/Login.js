import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  Modal,
} from 'react-native';
import {Button, Image, ListItem, Avatar} from 'react-native-elements';
import {LoginStruct, LoginOptions} from '../../forms/Iniciar';
import Toast, {DURATION} from 'react-native-easy-toast';

import t from 'tcomb-form-native';
const Form = t.form.Form;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: '',
        email: '',
        id: '',
      },
      formData: {
        email: '',
        password: '',
      },
      login: '',
      modalVisible: false,
    };
    this.getLogin();
  }

  getLogin = async () => {
    const result = await AsyncStorage.getItem('login');
    this.setState({
      login: result,
    });
  };

  registro = () => {
    this.props.navigation.navigate('Register');
  };

  login = async () => {
    this.setState({
      modalVisible: true,
    });
    await fetch('http://admin.app.elman.minutodedios.fm/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Aplication/json',
      },
      body: JSON.stringify(this.state.formData),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) {
          AsyncStorage.setItem('login', String('true'));
          AsyncStorage.setItem('user_id', String(res.data[0].id));

          this.refs.toast.show('Inicio correcto!', 500, () => {
            this.props.navigation.navigate('Suscripcion');
            this.getLogin();
            this.setState({
              modalVisible: false,
            });
          });
        } else {
          this.setState({
            modalVisible: false,
          });
          this.refs.toast.show('Datos Incorrectos!', 500, () => {
            // this.props.navigation.navigate("Login");
          });
        }
      });
  };
  cerrarSesion = async () => {
    await AsyncStorage.setItem('login', String('false'));
    this.setState({
      login: 'false',
    });
    this.getLogin();
  };
  onChangeLogin = value => {
    this.setState({
      formData: value,
    });
  };
  goTo = () => {
    this.props.navigation.navigate('Soporte');
  };
  render() {
    const {login} = this.state;
    const list = [
      {
        title: 'Soporte',
        iconType: 'material-community',
        iconNameLetf: 'settings-outline',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: this.goTo,
      },
      {
        title: 'Cerrar Sesión',
        iconType: 'material-community',
        iconNameLetf: 'close-circle-outline',
        iconColorLeft: '#ccc',
        iconNameRight: 'chevron-right',
        iconColorRight: '#ccc',
        onPress: this.cerrarSesion,
      },
    ];

    if (login == 'true') {
      return (
        <View style={styles.viewBody}>
          <View style={styles.viewAvatar}>
            {/* <Avatar rounded size="large" containerStyle={styles.avatarUser} />
          <View>
            <Text style={styles.textName}>Nombre:</Text>
            <Text style={styles.textEmail}>Email:</Text>
          </View> */}
          </View>
          <View style={styles.viewList}>
            {list.map((l, i) => (
              <ListItem
                key={i}
                leftIcon={{
                  type: l.iconType,
                  name: l.iconNameLetf,
                  color: l.iconColorRight,
                }}
                title={l.title}
                subtitle={l.subtitle}
                rightIcon={{
                  type: l.iconType,
                  name: l.iconNameRight,
                  color: l.iconColorRight,
                }}
                onPress={l.onPress}
                containerStyle={styles.listItem}
                bottomDivider
              />
            ))}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.viewModal}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Iniciando...</Text>
            </View>
          </Modal>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/img/logo_elman.png')}
              style={styles.logoLogin}
              PlaceholderContent={<ActivityIndicator />}
              resizeMode="contain"
            />
          </View>
          <View style={styles.formView}>
            <Form
              ref="loginForm"
              type={LoginStruct}
              options={LoginOptions}
              value={this.state.formData}
              onChange={value => this.onChangeLogin(value)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => this.login()}>
              <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <Text style={styles.textRegister}>
              ¿Aún no tienes cuenta?{' '}
              <Text style={styles.btnRegister} onPress={() => this.registro()}>
                Regístrate
              </Text>{' '}
            </Text>

            <Toast
              ref="toast"
              style={{backgroundColor: '#5d5d5d'}}
              position="bottom"
              positionValue={620}
              fadeInDuration={1000}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle={{color: '#ffff'}}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  imageView: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 30,
  },
  formView: {
    flex: 3,
  },
  viewBody: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#fff',
  },
  viewList: {
    flex: 3,
  },
  listItem: {
    // borderColor: "red",
    // borderWidth: 1
  },

  buttonLogin: {
    backgroundColor: '#280C54',
    marginTop: 20,
  },

  logoLogin: {
    // marginTop: "10%",
    width: 250,
    height: 150,
    // borderColor: "red",
    // borderWidth: 1
  },
  textName: {
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  textEmail: {
    fontWeight: '100',
    marginLeft: '5%',
  },
  viewAvatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#bdbdbd',
    paddingTop: 30,
    paddingBottom: 30,
  },
  textRegister: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    // marginBottom: -10
  },
  btnRegister: {
    color: '#00a680',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btn: {
    backgroundColor: '#280C54',
    borderRadius: 33,
    padding: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  viewModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeeead',
  },
});
