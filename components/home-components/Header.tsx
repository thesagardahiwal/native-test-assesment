import { View, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { TvShowData } from '@/types';
import { router } from 'expo-router';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const Header = ({topShow} : {topShow : TvShowData[] | null}) => {
   const handlePress = ({showDetails} : {showDetails: TvShowData}) => {
          router.navigate({
            pathname: "/details/[id]",
            params: {id: JSON.stringify(showDetails)}
          });
        }
  
  return (
    <View className='justify-between h-[500px]'>
      <Pressable
        onPress={() => topShow && handlePress({showDetails: topShow[0]})}
       className=' top-0 -z-10 bottom-0 left-0 right-0 absolute justify-center items-center flex-1'>
          
        <Image
          placeholder={{ blurhash }}
          style={{ height: "100%", width: "100%" }}
          contentFit="fill"
          source={topShow && topShow[0]?.show.image?.original}
        />
        
      </Pressable>

    </View>
  )
}

export default Header;