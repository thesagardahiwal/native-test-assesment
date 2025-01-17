import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import React from 'react';
import { TvShowData } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '@/constants/helper';
import BackIcon from "@expo/vector-icons/AntDesign"

const ShowDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const contentDetails: TvShowData = JSON.parse(id);

    const {
        show: {
            name,
            genres,
            rating,
            summary,
            language,
            premiered,
            status,
            runtime,
            schedule,
            officialSite,
            image,
        },
    } = contentDetails;

    const screenWidth = Dimensions.get('screen').width;

    return (
        <SafeAreaView className="flex-1 bg-black">
            {/* Header Image */}
            <View>
                <TouchableOpacity
                    className='h-10 w-10 z-10 absolute items-center justify-center'
                onPress={() => router.back()}>
                    <BackIcon name={"arrowleft"} size={33} color={"white"} />
                </TouchableOpacity>
                <Image
                    source={image?.original}
                    style={{ height: 300, width: screenWidth }}
                    placeholder={{ blurhash }}
                    contentFit="cover"
                    className="rounded-b-lg"
                />
            </View>


            <ScrollView className="flex-1 px-4 pt-4">
                {/* Title and Genres */}
                <View className="mb-4">
                    <Text className="text-white text-3xl font-semibold">{name}</Text>
                    <Text className="text-slate-400 text-base mt-2">
                        {genres.join(' • ')}
                    </Text>
                </View>

                {/* Rating and Language */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-white text-lg">
                        ⭐ {rating?.average ?? 'N/A'} / 10
                    </Text>
                    <Text className="text-slate-400 text-base">
                        Language: {language}
                    </Text>
                </View>

                {/* Status and Runtime */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-slate-400 text-base">
                        {status} {premiered ? `• Premiered: ${premiered}` : ''}
                    </Text>
                    <Text className="text-slate-400 text-base">
                        Runtime: {runtime ? `${runtime} mins` : 'N/A'}
                    </Text>
                </View>

                {/* Schedule */}
                {schedule?.days?.length > 0 && (
                    <View className="mb-4">
                        <Text className="text-white text-lg font-medium mb-1">
                            Schedule
                        </Text>
                        <Text className="text-slate-400 text-base">
                            {schedule.days.join(', ')} at {schedule.time || 'N/A'}
                        </Text>
                    </View>
                )}

                {/* Summary */}
                <View className="mb-4">
                    <Text className="text-white text-lg font-medium mb-2">Summary</Text>
                    <Text className="text-slate-400 text-base leading-6">
                        {summary?.replace(/<\/?[^>]+(>|$)/g, '') ?? 'No summary available.'}
                    </Text>
                </View>

                {/* Official Site Button */}
                {officialSite && (
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(officialSite);
                        }}
                        className="bg-red-600 py-3 px-5 rounded-lg mt-4"
                    >
                        <Text className="text-white text-center text-lg font-medium">
                            Visit Official Site
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShowDetails;
