import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Colors } from '../constants';
import { CustomHeaderScreen } from '../components';

export const ChatDetail = ({ navigation }) => {
  const onBack = () => navigation.goBack();
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen
        title="Driver. Mr Steven"
        subTitle="Last seen 2 mins ago"
        leftAction={onBack}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
