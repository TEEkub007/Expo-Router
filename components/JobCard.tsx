import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const JobCard = ({ job, onPress }: any) => {
  // Generate a simple color based on company name for the placeholder logo
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-emerald-500', 'bg-rose-500'];
  const colorIndex = job.company.length % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-1"
    >
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center flex-1">
          <View className={`w-12 h-12 ${bgColor} rounded-2xl items-center justify-center`}>
            <Text className="text-white font-bold text-lg">{job.company.charAt(0)}</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-gray-900 text-lg font-bold" numberOfLines={1}>{job.title}</Text>
            <Text className="text-gray-500 text-sm font-medium">{job.company}</Text>
          </View>
        </View>
        <TouchableOpacity>
           <Ionicons name="bookmark-outline" size={22} color="#D1D5DB" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-4 space-x-4">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-500 text-sm ml-1 font-medium">{job.location}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-500 text-sm ml-1 font-medium">{job.type}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center pt-4 border-t border-gray-50">
        <Text className="text-blue-600 font-bold text-base">{job.salary.split(' ')[0]} <Text className="text-gray-400 font-medium text-xs">/เดือน</Text></Text>
        <View className="bg-blue-50 px-4 py-2 rounded-xl">
          <Text className="text-blue-600 font-semibold text-xs">รายละเอียด</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;