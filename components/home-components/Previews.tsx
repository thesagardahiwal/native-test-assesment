import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { TvShowData } from '@/types'
import { Image } from 'expo-image';
import { blurhash } from '@/constants/helper';
import { router } from 'expo-router';

const Previews = ({ previewShows }: { previewShows: TvShowData[] | null }) => {
    const handlePress = ({ showDetails }: { showDetails: TvShowData }) => {
        router.navigate({
            pathname: "/details/[id]",
            params: { id: JSON.stringify(showDetails) }
        });
    }

    const renderItem = useCallback(({ item }: { item: TvShowData }) => (
        <TouchableOpacity
            onPress={() => handlePress({ showDetails: item })}
            className='h-[120px] w-[120px] rounded-full items-center justify-center'>
            <Image
                placeholder={{ blurhash }}
                style={{ width: "100%", height: "100%", borderRadius: 1000 }}
                source={item.show.image?.medium}
            />
        </TouchableOpacity>
    ), []);
    return (
        <View className='mt-4'>
            <View className='my-4'>
                <Text className=' font-bold text-3xl text-white'>Previews</Text>
            </View>
            <FlatList
                contentContainerClassName='gap-4'
                horizontal
                showsHorizontalScrollIndicator={false}
                data={previewShows}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Previews