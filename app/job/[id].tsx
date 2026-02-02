import { jobs } from 'data/job';
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const job = jobs.find((j) => j.id.toString() === id);

  if (!job) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center p-5">
          <Ionicons name="alert-circle-outline" size={64} color="#9CA3AF" />
          <Text className="text-xl font-bold text-gray-900 mt-4">ไม่พบข้อมูลงาน</Text>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mt-6 bg-blue-600 px-8 py-3 rounded-2xl"
          >
            <Text className="text-white font-bold">กลับหน้าหลัก</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-emerald-500', 'bg-rose-500'];
  const colorIndex = job.company.length % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Custom Navigation Bar */}
      <View className="flex-row justify-between items-center px-5 py-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="bg-gray-50 p-2 rounded-xl border border-gray-100"
        >
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">รายละเอียดงาน</Text>
        <TouchableOpacity className="bg-gray-50 p-2 rounded-xl border border-gray-100">
          <Ionicons name="share-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Section */}
        <View className="items-center px-5 pt-6 pb-8">
          <View className={`w-20 h-20 ${bgColor} rounded-3xl items-center justify-center shadow-lg mb-4`}>
            <Text className="text-white font-bold text-3xl">{job.company.charAt(0)}</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center mb-1">{job.title}</Text>
          <Text className="text-blue-600 text-lg font-medium mb-6">{job.company}</Text>

          {/* Info Pills */}
          <View className="flex-row justify-center space-x-3">
            <View className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#4B5563" />
              <Text className="text-gray-600 font-medium ml-1.5">{job.location}</Text>
            </View>
            <View className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#4B5563" />
              <Text className="text-gray-600 font-medium ml-1.5">{job.type}</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="px-5">
          {/* Salary Card */}
          <View className="bg-blue-50 p-5 rounded-3xl flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">เงินเดือนต่อเดือน</Text>
              <Text className="text-blue-900 text-xl font-bold">{job.salary}</Text>
            </View>
            <View className="bg-blue-600/10 p-2 rounded-xl">
              <Ionicons name="cash-outline" size={28} color="#2563EB" />
            </View>
          </View>

          {/* Description */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">รายละเอียดงาน</Text>
            <Text className="text-gray-600 text-base leading-relaxed">
              {job.description}
            </Text>
          </View>

          {/* Requirements */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">คุณสมบัติ</Text>
            {job.requirements.map((req, index) => (
              <View key={index} className="flex-row items-start mb-3">
                <View className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 mr-3" />
                <Text className="flex-1 text-gray-600 text-base">{req}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Apply Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-4 pb-8 border-t border-gray-100 shadow-xl">
        <View className="flex-row space-x-4">
          <TouchableOpacity className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-200 items-center justify-center">
             <Ionicons name="bookmark-outline" size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-600 h-14 rounded-2xl items-center justify-center shadow-lg active:bg-blue-700">
            <Text className="text-white font-bold text-lg">สมัครงานนี้</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JobDetails;