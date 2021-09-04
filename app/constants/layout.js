import { StyleSheet } from 'react-native';
import { Colors } from './theme';
import { w, h } from './metrics';
export default Layout = StyleSheet.create({
  //Column
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },

  colCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  colHCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  //Row
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowHCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  //Default layout
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsEnd: {
    alignItems: 'flex-end',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },

  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  justifyContentEvenly: {
    justifyContent: 'space-evenly',
  },

  shadow: {
    shadowColor: Colors.suva_grey,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,

    elevation: 12,
  },

  shadowCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  // Size layout
  fill: {
    flex: 1,
  },
  fullSize: {
    width: w,
    height: h,
  },
  fullWidth: {
    width: w,
  },
  fullHeight: {
    height: h,
  },
});
