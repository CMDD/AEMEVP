import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Icon} from 'react-native-elements';

export default InputTemplate = locals => {
  return (
    <View style={styles.viewContainer}>
      <Input
        placeholder={locals.config.placeholder}
        multiline={true}
        rightIcon={
          <Icon
            type={locals.config.iconType}
            name={locals.config.iconName}
            size={24}
            color="#ccc"
          />
        }
        onChangeText={value => locals.onChange(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});
