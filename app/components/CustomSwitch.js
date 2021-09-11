import React from 'react';
import { Switch } from 'react-native';
import { Colors } from '../constants';

export const CustomSwitch = ({
  defaultValue,
  onValueChange,
  thumbColor = Colors.orange,
  ...props
}) => {
  const [value, setValue] = React.useState(defaultValue);
  const onHandleValueChange = (value) => {
    setValue(value);
    onValueChange(value);
  };

  return (
    <Switch
      value={value}
      onValueChange={onHandleValueChange}
      thumbColor={thumbColor}
      trackColor={{
        false: Colors.wisp_pink,
        true: Colors.wisp_pink,
      }}
      style={{
        transform: [{ scale: 0.8 }],
      }}
      {...props}
    />
  );
};
