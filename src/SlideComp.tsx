import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function SlideComp() {
  const {position, duration} = useProgress();

  const formatTime = (secs: number) => {
    let minutes = Math.floor(secs / 60);
    let seconds: any = Math.ceil(secs - minutes * 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };
  const handleChange = (val) => {
    TrackPlayer.seekTo(val);
  };
  return (
    <View style={styles.container}>
      <Slider
        style={{width: 320, height: 40}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="rgba(255, 255, 255, .5)"
        onSlidingComplete={handleChange}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timer}>{formatTime(position)}</Text>
        <Text style={styles.timer}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timer: {
    color: '#fff',
    fontSize: 16,
  },
});
