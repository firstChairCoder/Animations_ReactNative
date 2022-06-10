import React, { useCallback, useRef, useState } from "react";
import { Box, Text } from "react-native-design-utility";
import { ScrollView } from "react-native-gesture-handler";

import TaskItem from "../../components/TaskItem";

const todos = [
  "Record the dismissible tutorial 🎥",
  "Leave a 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];

export const TaskSwipeScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [tasks, setTasks] = useState<string[]>(todos);
  const onDismiss = useCallback((text) => {
    setTasks((prevTasks) => prevTasks.filter((todo) => todo !== text));
  }, []);

  return (
    <Box f={1}>
      <Text size={40} weight={"600"} p={20}>
        Task
      </Text>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {todos.map((todo) => (
          <TaskItem
            key={todo}
            simultaneousHandlers={scrollRef}
            onDismiss={onDismiss}
          >
            {todo}
          </TaskItem>
        ))}
      </ScrollView>
    </Box>
  );
};
