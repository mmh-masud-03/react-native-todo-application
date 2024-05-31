// TaskList.js
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Task from "./Task";

const TaskList = ({ tasks, deleteTask, updateTask, toggleTask }) => {
  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.noTask}>No Tasks available</Text>
      ) : (
        <Text style={styles.header}>Your Tasks are:</Text>
      )}
      <ScrollView style={styles.taskList}>
        {tasks.slice().map((task, index) => (
          <Task
            key={index}
            task={task}
            onDelete={() => deleteTask(index)}
            onUpdate={(title) => updateTask(index, title)}
            onToggle={() => toggleTask(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
  },
  header: {
    marginLeft: 8,
    marginBottom: 12,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  noTask: {
    margin: 10,
  },
  taskList: {},
});

export default TaskList;
