import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks:", error);
      }
    };

    saveTasks();
  }, [tasks]);

  const addTask = (title) => {
    if (title.trim() !== "") {
      setTasks([...tasks, { title, completed: false }]);
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const updateTask = (index, title) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], title: title };
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>My Todo List</Text>
      </View>
      <View style={styles.container}>
        <AddTask addTask={addTask} />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          toggleTask={toggleTask}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    paddingTop: 10,
  },
});

export default App;
