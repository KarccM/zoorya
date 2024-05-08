import { styled } from "nativewind";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);

export default ({ active, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledView style={active ? styles["active-chip"] : styles.chip}>
        <StyledText>
          {title}
        </StyledText>
      </StyledView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  'active-chip': {
    backgroundColor: '#DBE7EA',
    color: '#1E40AF',
    border: '0px solid #000,',
    borderRadius: 4,
    fontSize: 14,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 3,
  },
  chip: {
    color: '#000000',
    backgroundColor: '#fff',
    border: '0px solid #000',
    borderRadius: 4,
    fontSize: 14,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 3,
  },
})
