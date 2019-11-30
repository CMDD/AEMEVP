import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Modal,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {RegisterStruct, RegisterOptiones} from '../../forms/Register';
import Toast, {DURATION} from 'react-native-easy-toast';
import t from 'tcomb-form-native';
const Form = t.form.Form;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: 'jhon',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      errorMessage: '',
      modalVisible: false,
    };
  }

  register = async () => {
    const {password, passwordConfirmation} = this.state.formData;
    if (password === passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        this.setState({
          errorMessage: '',
        });
        this.setState({
          modalVisible: true,
        });
        await fetch(
          'http://admin.app.elman.minutodedios.fm/api/auth/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'Aplication/json',
            },
            body: JSON.stringify(this.state.formData),
          },
        )
          .then(res => res.json())
          .then(res => {
            console.log(res.data.id);
            AsyncStorage.setItem('login', String('true'));
            AsyncStorage.setItem('user_id', String(res.data.id));
            this.refs.toast.show('Registro completo!', 500, () => {
              this.props.navigation.navigate('Login');
            });
          })
          .catch(error => {
            this.setState({
              errorMessage: 'El correo ya existe!',
              modalVisible: false,
            });
          });
      } else {
        this.setState({
          errorMessage: 'Formulario sin validad',
        });
      }
    } else {
      this.setState({
        errorMessage: 'Las contraseñas no son iguales',
      });
    }
  };
  onChangeRegister = value => {
    this.setState({
      formData: value,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image
            source={require('../../assets/img/logo_elman.png')}
            style={styles.logoLogin}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewForm}>
          <Form
            ref="registerForm"
            type={RegisterStruct}
            options={RegisterOptiones}
            value={this.state.formData}
            onChange={value => this.onChangeRegister(value)}
          />
          <TouchableOpacity style={styles.btn} onPress={() => this.register()}>
            <Text style={styles.btnText}>Registrarme</Text>
          </TouchableOpacity>
          <Text style={styles.textRegister}>
            ¡Ya tengo cuenta!{' '}
            <Text
              style={styles.btnRegister}
              onPress={() => this.props.navigation.navigate('Login')}>
              Iniciar sesión
            </Text>{' '}
          </Text>

          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          <Toast
            ref="toast"
            style={{backgroundColor: '#5d5d5d'}}
            position="bottom"
            positionValue={920}
            fadeInDuration={1000}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{color: '#ffff'}}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.viewModal}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Registrando...</Text>
            </View>
          </Modal>
        </View>
      </View>
    );
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
    justifyContent: 'center',
    marginTop: 30,
  },
  viewForm: {
    flex: 3,
    // borderColor: "green",
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
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
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
