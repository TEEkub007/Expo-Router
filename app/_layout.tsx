import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";

const _layout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false, // Hide the default header to use custom headers in components
          contentStyle: { backgroundColor: '#f9fafb' }, // Match gray-50
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="job/[id]" />
      </Stack>
    </>
  );
};

export default _layout;