import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TvShowData } from '@/types';
import { Image } from 'expo-image';
import { blurhash } from '@/constants/helper';
import useFetch from '@/hooks/useFetch';
import { router } from 'expo-router';

const SearchContent = () => {
  const [query, setQuery] = useState<string>(''); // For user input
  const [debouncedQuery, setDebouncedQuery] = useState<string>(''); // Debounced query
  const [searchData, setSearchData] = useState<TvShowData[] | null>(null);

  const { data, loading, error } = useFetch<TvShowData[]>(
    `https://api.tvmaze.com/search/shows?q=${debouncedQuery}`,
    {
      skip: !debouncedQuery, // Skip fetch if the debouncedQuery is empty
    }
  );

  const handlePress = ({showDetails} : {showDetails: TvShowData}) => {
    router.navigate({
      pathname: "/details/[id]",
      params: {id: JSON.stringify(showDetails)}
    });
  }
  // Update searchData whenever the API fetch data changes
  useEffect(() => {
    if (data) {
      setSearchData(data);
    }
  }, [data]);

  // Debounce logic: Updates the debouncedQuery after 300ms of inactivity
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => {
      clearTimeout(handler); // Clear timeout on query change
    };
  }, [query]);

  // Render each item
  const renderItem = useCallback(
    ({ item }: { item: TvShowData }) => (
      <TouchableOpacity
        onPress={() => handlePress({showDetails: item})}
       className="h-[100px] bg-white/20 items-center flex-row justify-between">
        <View className="flex-row gap-4 items-center">
          <Image
            source={item.show.image?.medium}
            style={{ height: 100, width: 180 }}
            placeholder={{ blurhash }}
            contentFit="cover"
          />
          <Text
            numberOfLines={2}
           className="font-semibold w-[150px] text-ellipsis text-white text-xl text-left">
            {item.show.name}
          </Text>
        </View>
        <View className='p-4'>
          <Text className="text-center text-white">Play</Text>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Search Input */}
      <View className="p-4">
        <TextInput
          className="bg-white/20 text-white rounded-md p-3"
          placeholder="Search TV Shows..."
          placeholderTextColor="#ccc"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Display Loader or Error */}
      {loading && (
        <Text className="text-white text-center mt-4">Loading...</Text>
      )}
      {error && (
        <Text className="text-red-500 text-center mt-4">{error}</Text>
      )}

      {/* Display Search Results */}
      <FlatList
        contentContainerStyle={{ gap: 10, padding: 10 }}
        data={searchData}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-4">
            No results found.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default SearchContent;
