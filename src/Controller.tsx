import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {TrackType} from 'react-native-track-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

export default function Controller({onNext, onPrv}) {
  const playbackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = useState('paused');

  useEffect(() => {
    if (playbackState === 3) {
      //TrackPlayer.pause();
      setIsPlaying('playing');
    } else if (playbackState === 2) {
      //TrackPlayer.play();
      setIsPlaying('paused');
    } else {
      setIsPlaying('loading');
    }
  }, [playbackState]);

  const renderPlayPauseBtn = () => {
    console.log(isPlaying);
    switch (isPlaying) {
      case 'playing':
        return <MaterialIcons color="#fff" name="pause" size={45} />;
      case 'paused':
        return <MaterialIcons color="#fff" name="play-arrow" size={45} />;
      default:
        return <ActivityIndicator size={45} />;
    }
  };

  const onPlayPause = () => {
    if (playbackState === 3) {
      TrackPlayer.pause();
    } else if (playbackState === 2) {
      TrackPlayer.play();
    }
    console.log(playbackState);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <MaterialIcons color="#fff" name="skip-previous" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
        {renderPlayPauseBtn()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <MaterialIcons color="#fff" name="skip-next" size={45} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
});
