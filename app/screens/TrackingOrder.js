import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  Card,
  CustomHeaderScreen,
  CustomButton,
  IndicatorAnimation,
} from '@components';
import {
  Colors,
  SPACING,
  FontStyle,
  MENU_SCREEN,
  CHECKOUT_SCREEN,
  Layout,
  RADIUS,
  w,
  h,
  Icons,
} from '@constants';
import { GOOGLE_MAPS_API_KEY } from '../config/map';
import StepIndicator from 'react-native-step-indicator';

const STATUS_ORDER = [
  {
    label: 'Prepare',
    key: 'processing',
  },
  {
    label: 'Deliver',
    key: 'delivery',
  },
  {
    label: 'Success',
    key: 'success',
  },
];

const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: Colors.transparent,
  stepStrokeWidth: 0,
  stepStrokeFinishedColor: Colors.transparent,
  stepStrokeUnFinishedColor: '#E7EAEF',
  separatorFinishedColor: Colors.orange,
  separatorUnFinishedColor: '#E7EAEF',
  stepIndicatorFinishedColor: Colors.transparent,
  stepIndicatorUnFinishedColor: '#E7EAEF',
  stepIndicatorCurrentColor: Colors.transparent,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.transparent,
  stepIndicatorLabelFinishedColor: Colors.text,
  stepIndicatorLabelUnFinishedColor: '#E7EAEF',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: Colors.text,
};
export const TrackingOrder = ({ navigation, route }) => {
  const { item } = route.params;
  const { shipper, shipping_address } = item;
  const init_index = STATUS_ORDER.findIndex(
    (element) => element.key === item.status
  );
  const mapRef = React.useRef(null);
  const [isReady, setReady] = React.useState(false);
  const [region, setRegion] = React.useState(null);
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const [angle, setAngle] = React.useState();

  const onBack = () => navigation.goBack();

  const onGoToMessage = () => {
    //navigation.navigate(MENU_SCREEN);
  };

  const onCalling = () => {
    // navigation.navigate(CHECKOUT_SCREEN);
  };

  const calculateAngle = (coordinates) => {
    let startLat = coordinates[0].latitude;
    let startLng = coordinates[0].longitude;

    let endLat = coordinates[1].latitude;
    let endLng = coordinates[2].longitude;

    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const onReady = (result) => {
    setDuration(Math.ceil(result.duration));
    if (!isReady) {
    //  mapRef.current?.fitToCoordinates(result?.coordinates);

      let nextLoc = {
        latitude: result?.coordinates[0]['latitude'],
        longitude: result?.coordinates[0]['longitude'],
      };
      if (result?.coordinates.length >= 2) {
        let angle = calculateAngle(result?.coordinates);
        setAngle(angle);
      }
      setFromLocation(nextLoc);
      setReady(true);
    }
  };

  React.useEffect(() => {
    const fromLoc = shipper?.location ?? {};
    const toLoc = shipping_address?.location ?? {};
    const region = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(region);
  }, []);

  const renderStepIndicator = ({ stepStatus }) => (
    <IndicatorAnimation status={stepStatus} inactiveColor="#E7EAEF " />
  );

  const DestinationMarker = () => {
    return (
      <Marker coordinate={toLocation}>
        <View style={styles.pinContainer}>
          <Image source={Icons.pin} style={styles.iconPin} />
        </View>
      </Marker>
    );
  };

  const ShipperMarker = () => {
    return (
      <Marker
        rotation={angle}
        flat={true}
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={fromLocation}
      >
        <Image source={Icons.shipper} style={styles.iconShipper} />
      </Marker>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeaderScreen title="Tracking" leftAction={onBack} />

      <View style={Layout.fill}>
        {region && (
          <MapView
            ref={mapRef}
            style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
            initialRegion={region}
          >
            <MapViewDirections
              origin={fromLocation}
              destination={toLocation}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={3}
              strokeColor={Colors.orange}
              optimizeWaypoints={true}
              onReady={onReady}
            />
            <ShipperMarker />
            <DestinationMarker />
          </MapView>
        )}
      </View>

      <Card width={w} height={w * 0.7} style={styles.bottomContainer}>
        <View style={{ width: w, marginTop: SPACING }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={init_index}
            labels={STATUS_ORDER.map((item) => item.label)}
            stepCount={STATUS_ORDER.length}
            renderStepIndicator={renderStepIndicator}
          />
        </View>

        <Card
          width={w * 0.85}
          height={w * 0.25}
          backgroundColor={Colors.ghost_white}
          style={Layout.rowVCenter}
        >
          <Image source={{ uri: shipper?.image }} style={styles.avatar} />

          <View style={styles.content}>
            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.name}>
              {shipper?.first_name} {shipper?.last_name}
            </Text>
            <View style={Layout.rowVCenter}>
              <Image source={Icons.safari} style={styles.icon} />
              <Text style={styles.duration}>{duration} minutes on the way</Text>
            </View>
          </View>
        </Card>

        <View
          style={[
            Layout.rowVCenter,
            Layout.justifyContentEvenly,
            Layout.fullWidth,
          ]}
        >
          <CustomButton
            label="Call"
            iconName={Icons.phone}
            width={w * 0.38}
            onPress={onCalling}
          />
          <CustomButton
            label="Message"
            iconName={Icons.email}
            width={w * 0.38}
            labelColor={Colors.primary}
            backgroundColor={Colors.azure}
            onPress={onGoToMessage}
          />
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
    backgroundColor: Colors.white,
  },
  bottomContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: RADIUS * 2,
    borderTopRightRadius: RADIUS * 2,
    ...Layout.shadow,
    ...Layout.justifyContentBetween,
  },
  content: {
    ...Layout.fill,
    paddingHorizontal: SPACING * 1.5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: RADIUS,
    resizeMode: 'contain',
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: Colors.suva_grey,
  },
  pinContainer: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: Colors.orange,
    ...Layout.center,
  },
  iconPin: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  iconShipper: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  name: {
    ...FontStyle.h2,
    color: Colors.Text,
    paddingBottom: SPACING - 2,
  },
  duration: {
    ...FontStyle.h5,
    paddingLeft: SPACING / 2,
    color: '#ACACAD',
  },
});
