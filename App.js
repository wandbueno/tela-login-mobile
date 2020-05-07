import React, {useEffect, useState} from 'react';
import {
  View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacit, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Keyboard 
} from 'react-native';

import styles from './styles';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState (new Animated.ValueXY({x: 151, y: 155}));

  useEffect(() => {

    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y,{
        toValue:0,
        speed:4,
        bounciness:20
      }), 
      Animated.timing(opacity, {
        toValue:1,
        duration: 200,

      })
    ]).start();
  }, []);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:70,
        duration:100,
      }),
      Animated.timing(logo.y,{
        toValue:70,
        duration:100,
      })
    ]).start();
  }

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x,{
        toValue:151,
        duration:100,
      }),
      Animated.timing(logo.y,{
        toValue:155,
        duration:100,
      })
    ]).start();
  
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.containerLogo}>
        <Animated.Image
        style={{
          width: logo.x,
          height: logo.y,
        }}
        source={require('./assets/logo.png')}
        />
      </View>

      <Animated.View 
      style={[
        styles.container1,
        {
          opacity: opacity,
          transform: [
            { translateY: offset.y}
          ]
        }
        ]}
      >
        
        <TextInput
        style={styles.input}
        placeholder="E-mail"
        autoCorrect={false}
        onChangeText={() => {}}
        />
        <TextInput
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.botao}> 
          <Text style={styles.TextoBotao}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCriar}>
          <Text style={styles.TextCriar}>Criar conta gratuita</Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}
