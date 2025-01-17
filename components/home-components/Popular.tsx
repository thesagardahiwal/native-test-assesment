import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { TvShowData } from '@/types'
import { Image } from 'expo-image';
import { blurhash } from '@/constants/helper';
import { router } from 'expo-router';

const Popular = ({ popularShows }: { popularShows: TvShowData[] | null }) => {
    const renderItem = useCallback(({ item }: { item: TvShowData }) => (
        <TouchableOpacity
            onPress={() => handlePress({ showDetails: item })}
            className='h-[120px] w-[120px] items-center rounded-full justify-center'>
            <Image
                placeholder={{ blurhash }}
                style={{ width: "100%", height: "100%", borderRadius: 1000 }}
                source={item.show.image?.medium}
            />
        </TouchableOpacity>
    ), []);

    const handlePress = ({ showDetails }: { showDetails: TvShowData }) => {
        router.navigate({
            pathname: "/details/[id]",
            params: { id: JSON.stringify(showDetails) }
        });
    }

    return (
        <View className='mt-4'>
            <Text className='my-6 text-white font-bold text-3xl'>Popular</Text>

            <FlatList
                horizontal
                contentContainerClassName="gap-4"
                showsHorizontalScrollIndicator={false}
                data={popularShows}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Popular