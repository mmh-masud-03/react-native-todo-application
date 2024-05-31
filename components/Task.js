import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Task = ({ task, onDelete, onUpdate, onToggle }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    onUpdate(editedTitle);
    setIsEditing(false);
  };

  return (
    <View style={styles.task}>
      <TouchableOpacity onPress={onToggle}>
        <Icon
          name={task.completed ? "check-square" : "square-o"}
          size={20}
          color={task.completed ? "green" : "black"}
          style={styles.icon}
        />
      </TouchableOpacity>
      {!isEditing ? (
        <Text style={[styles.taskText, task.completed && styles.completedText]}>
          {task.title}
        </Text>
      ) : (
        <TextInput
          style={[styles.taskText, task.completed && styles.completedText]}
          value={editedTitle}
          onChangeText={setEditedTitle}
          autoFocus={true}
          onBlur={handleUpdate}
        />
      )}
      {!task.completed && !isEditing && (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Icon name="edit" size={22} color="blue" style={styles.icon} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onDelete}>
        <Icon name="trash" size={22} color="red" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    textDecorationLine: "none",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default Task;
