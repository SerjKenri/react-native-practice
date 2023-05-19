import { View, TextInput } from "react-native";

const RegistrationScreen = () => {
  return (
    <View>
      <View>
        <TextInput placeholder="Логин" />
        <TextInput placeholder="Адрес электронной почты" />
        <TextInput placeholder="Пароль" secureTextEntry={true} />
      </View>
    </View>
  );
};

export { RegistrationScreen };
