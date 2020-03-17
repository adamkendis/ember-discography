import Transform from '@ember-data/serializer/transform';

export default class TimeStringTransform extends Transform {

  // Converts integer (time in seconds) into MM:ss string.
  deserialize(serialized) {
    let minutes = Math.floor(serialized / 60);
    let seconds = serialized % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  // Converts MM:ss string into integer (time in seconds);
  serialize(deserialized) {
    let [minutes, seconds] = deserialized.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds);
  }
}
