import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Todos } from './Todos';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Box = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem('@MySuperStore:todoItem');
        if (savedTodos !== null) {
          setTodos(JSON.parse(savedTodos));
        }
      } catch (error) {
        console.error('Failed to load todos', error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('@MySuperStore:todoItem', JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos', error);
      }
    };

    saveTodos();
  }, [todos]);

  const handleAddTodo = () => {
    setTodos([...todos, text]);
    setText(""); // Clear input field after adding todo
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <View>
      <View style={styles.inputLabel}>
        <TextInput
          label='Enter your task todo'
          value={text}
          style={styles.box}
          onChangeText={text => setText(text)}
        />
        <Button mode="contained" style={styles.button} onPress={handleAddTodo}>
          Submit
        </Button>
      </View>
      <ScrollView style={styles.scrollViewPlace}>
        {todos.map((todo, index) => (
          <View style={styles.todo} key={index}>
            <Todos key={index} todoTask={todo} />
            <Button mode='contained' style={{ width: 1 }} onPress={() => handleDeleteTodo(index)}>
              X
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    flexDirection: 'row',
    backgroundColor: 'tomato'
  },
  box: {
    flex: 1,
    margin: 10,
  },
  button: {
    margin: 10,
    marginLeft: -5,
    justifyContent: 'center',
  },
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  scrollViewPlace: {
    marginTop: 50,
    height: 300,
    backgroundColor: 'tomato',
    borderRadius: 10,
  }
});
