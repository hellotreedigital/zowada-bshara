import React from "react";
import { I18nManager, StyleSheet, Text, View } from "react-native";
import { SCREEN_HEIGHT } from "../../globals/globals";

const Typography = (props) => {
  let DEFAULT_SCREEN_HEIGHT = 810;
  var responseFont = props.size / DEFAULT_SCREEN_HEIGHT;
  var responseLh = Math.floor(props.lh / DEFAULT_SCREEN_HEIGHT);
  var fontSize = SCREEN_HEIGHT * responseFont || 14;
  var paddingBottom = I18nManager.isRTL ? fontSize * 0.5 : 4;
  return (
    <View>
      <Text
        adjustsFontSizeToFit={props.fit || null}
        numberOfLines={props.lines || null}
        style={{
          fontFamily:
            (props.bold && "HelveticaBold") ||
            (!props.bold && "HelveticaRegular") ||
            (props.roman && "HelveticaLight"),
          color: props.color,
          // lineHeight: 35,
          // fontSize: SCREEN_HEIGHT * responseFont || 14,
          fontSize: fontSize,
          textAlign: props.align,
          paddingBottom: paddingBottom,
        }}
      >
        {props.content}
      </Text>
    </View>
  );
};

export default Typography;
