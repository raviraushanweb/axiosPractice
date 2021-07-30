import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [todo, setTodo] = useState([]);
  const getTodos = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos',
        params: {
          _limit: 5,
        },
      });
      //console.log('getting data :', res.data);\
      return res;
    } catch (error) {
      console.log('getting todos error: ', error);
    }
  };

  useEffect(() => {
    let mounted = true;
    getTodos().then(items => {
      if (mounted) {
        setTodo(items.data);
      }
    });
    return () => (mounted = false);
  }, []);

  console.log('a useeffect: ', todo);

  return (
    <View>
      <Text>Hello World</Text>
      {todo.map(item => (
        <View style={styles.item} key={item.id}>
          <Text>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    fontSize: 20,
  },
});

export default App;
