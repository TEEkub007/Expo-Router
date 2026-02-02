import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TextInput, TouchableOpacity, StatusBar, ScrollView, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import JobCard from 'components/JobCard';
import { jobs } from 'data/job';

// Categories for the filter pills
const CATEGORIES = ["ทั้งหมด", "Frontend", "Backend", "Mobile", "DevOps", "Design", "Data"];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const { width } = useWindowDimensions();

  // Responsive thresholds
  const isDesktop = width > 1024;
  const isTablet = width > 768;
  const isSmallPhone = width < 380;

  const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;
  const gap = 16;
  const paddingHorizontal = 20;

  // Calculate responsive width for grid items to ensure perfect alignment
  // Max width constraint matches the layout constraint (max-w-6xl approx 1152px)
  const maxContentWidth = 1152;
  const effectiveWidth = Math.min(width, maxContentWidth);
  const availableWidth = effectiveWidth - (paddingHorizontal * 2) - (gap * (numColumns - 1));
  const cardWidth = Math.floor(availableWidth / numColumns);

  // Calculate responsive width for featured cards
  const featuredCardWidth = isDesktop ? 380 : isTablet ? 320 : width * 0.8;

  const renderHeader = () => (
    <View className="pt-4 pb-2 w-full max-w-6xl mx-auto self-center">
      {/* Top Bar: Profile & Notification */}
      <View className="flex-row justify-between items-center px-5 mb-6">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center border-2 border-white shadow-sm">
            <Text className="text-blue-600 font-bold text-lg">JM</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-gray-500 text-xs font-medium">ยินดีต้อนรับ!!</Text>
            <Text className="text-gray-900 text-lg font-bold" numberOfLines={1}>John Mayer</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100 relative ml-2">
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>

      {/* Main Title */}
      <View className="px-5 mb-6">
        <Text
          style={{ fontSize: isSmallPhone ? 24 : 25 }}
          className="font-bold text-gray-900 leading-tight"
        >
          ค้นหาตำแหน่งงาน{"\n"}<Text className="text-blue-600">ที่เหมาะกับคุณ</Text>
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 flex-row items-center space-x-3 mb-8 max-w-2xl">
        <View className="flex-1 flex-row items-center bg-white h-14 px-4 rounded-2xl border border-gray-100 shadow-sm">
          <Ionicons name="search-outline" size={25} color="#9CA3AF" />
          <TextInput
            placeholder="ค้นหา..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-base text-gray-900"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity className="bg-blue-600 h-14 w-14 items-center justify-center rounded-2xl shadow-md active:bg-blue-700">
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Featured Jobs Section (Horizontal) */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center px-5 mb-4">
          <Text className="text-xl font-bold text-gray-900">งานแนะนำ</Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-medium">ดูทั้งหมด</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          snapToInterval={featuredCardWidth + 16} // 16 is mr-4
          decelerationRate="fast"
        >
          {jobs.slice(0, 3).map((job) => (
            <TouchableOpacity
              key={`featured-${job.id}`}
              onPress={() => router.push(`/job/${job.id}`)}
              style={{ width: featuredCardWidth }}
              className="bg-blue-600 mr-4 p-5 rounded-3xl shadow-lg h-44 justify-between"
            >
              <View className="flex-row justify-between items-start">
                <View className="bg-white/20 p-2 rounded-xl">
                  <Ionicons name="briefcase-outline" size={24} color="white" />
                </View>
                <TouchableOpacity className="p-1">
                  <Ionicons name="bookmark-outline" size={22} color="white" />
                </TouchableOpacity>
              </View>
              <View>
                <Text className="text-white text-lg font-bold mb-1" numberOfLines={1}>{job.title}</Text>
                <Text className="text-blue-100 text-sm" numberOfLines={1}>{job.company}</Text>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-white font-semibold">{job.salary.split(' ')[0]}</Text>
                <View className="bg-white/20 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-medium">{job.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Category Filter */}
      <View className="mb-6">
        <View className="px-5 mb-4">
          <Text className="text-xl font-bold text-gray-900">หมวดหมู่</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          renderItem={({ item }) => {
            const isActive = activeCategory === item;
            return (
              <TouchableOpacity
                onPress={() => setActiveCategory(item)}
                className={`mr-3 px-6 py-3 rounded-2xl border ${isActive
                  ? 'bg-gray-900 border-gray-900 shadow-sm'
                  : 'bg-white border-gray-100'
                  }`}
              >
                <Text className={`font-semibold ${isActive ? 'text-white' : 'text-gray-500'
                  }`}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Recent Jobs Title */}
      <View className="px-5 mb-4 flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-900">งานล่าสุด</Text>
        <Text className="text-sm text-gray-400 font-medium">
          พบ {jobs.length} ตำแหน่ง
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      <View className="flex-1 w-full max-w-6xl">
        <FlatList
          key={numColumns} // Force re-render when columns change
          data={jobs}
          numColumns={numColumns}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={numColumns > 1 ? { gap, paddingHorizontal } : undefined}
          renderItem={({ item }) => (
            <View
              style={numColumns > 1 ? { width: cardWidth, marginBottom: 16 } : undefined}
              className={numColumns === 1 ? 'px-5 mb-4' : ''}
            >
              <JobCard job={item} onPress={() => router.push(`/job/${item.id}`)} />
            </View>
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
