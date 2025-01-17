import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetch from '@/hooks/useFetch';
import { TvShowData } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/home-components/Header';
import LoadingScreen from '@/components/LoadingScreen';
import Previews from '@/components/home-components/Previews';
import Popular from '@/components/home-components/Popular';
import Navigation from '@/components/home-components/Navigation';

const index = () => {
    const { data, loading, error, refetch } = useFetch<TvShowData[]>('https://api.tvmaze.com/search/shows?q=all');
    if (loading) {
        return (
            <LoadingScreen/>
        )
    };

  return (
    <SafeAreaView className="flex-1 bg-black">
        <Navigation/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header topShow={data} />
        <Previews previewShows={data}/>
        <Popular popularShows={data} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default index