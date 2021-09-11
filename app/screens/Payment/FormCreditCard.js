import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomInput, CustomSwitch } from '../../components';
import { Colors, SPACING, FontStyle, Layout, w } from '../../constants';
import * as Animatable from 'react-native-animatable';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const FormCreditCard = React.forwardRef(({ onSubmit }, ref) => {
  const expDateRef = React.useRef();
  const cardNumberRef = React.useRef();

  const INITIAL_VALUES = {
    card_name: '',
    card_number: '',
    exp_date: '',
    cvv: '',
    save: false,
  };

  const Schema = Yup.object().shape({
    card_name: Yup.string().required('Required'),
    card_number: Yup.string()
      .required('Required')
      .test('card_number', 'Card number not valid', () => {
        return cardNumberRef.current?.isValid();
      }),
    exp_date: Yup.string()
      .required('Required')
      .test('exp_date', 'Date not valid', () => {
        return expDateRef.current?.isValid();
      }),
    cvv: Yup.string().required('Required'),
  });

  const onHandleSubmit = (values) => {
    if (typeof onSubmit === 'function') {
      onSubmit(values);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: Schema,
    onSubmit: onHandleSubmit,
  });

  React.useImperativeHandle(ref, () => ({
    values,
    handleSubmit,
  }));

  // ********* FUNCTION ********* //
  const toggleMode = (val) => {
    setFieldValue('save', val);
  };

  const onUpdateSchedules = (data) => {
    dispatch(updateSchedules(data));
  };

  const HeaderFormCard = () => {
    return (
      <View style={[styles.headerFormCardContainer]}>
        <Text style={styles.save}>Card Information</Text>
        <View style={Layout.rowVCenter}>
          <CustomSwitch defaultValue={values.save} onValueChange={toggleMode} />
          <Text
            style={[styles.save, { marginLeft: SPACING, color: Colors.text }]}
          >
            Save
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={400}
      delay={300}
      style={[Layout.fill, Layout.alignItemsCenter]}
    >
      <HeaderFormCard />
      <View style={[Layout.fill]}>
        <CustomInput
          label="Card name"
          style={{ marginBottom: SPACING * 2 }}
          value={values.card_name}
          onChangeText={handleChange('card_name')}
          onBlur={handleBlur('card_name')}
          error={errors.card_name && touched.card_name}
        />
        <CustomInput
          label="Card number"
          style={{ marginBottom: SPACING * 2 }}
          type={'credit-card'}
          value={values.card_number}
          onChangeText={handleChange('card_number')}
          onBlur={handleBlur('card_number')}
          ref={cardNumberRef}
          error={errors.card_number && touched.card_number}
        />

        <View style={[Layout.rowVCenter, Layout.justifyContentBetween]}>
          <CustomInput
            ref={expDateRef}
            label="Exp date"
            width={w * 0.4}
            type={'datetime'}
            options={{
              format: 'MM/YY',
            }}
            value={values.exp_date}
            onChangeText={handleChange('exp_date')}
            onBlur={handleBlur('exp_date')}
            error={errors.exp_date && touched.exp_date}
          />
          <CustomInput
            label="CVV"
            width={w * 0.4}
            value={values.cvv}
            keyboardType="numeric"
            onChangeText={handleChange('cvv')}
            onBlur={handleBlur('cvv')}
            maxLength={4}
            error={errors.cvv && touched.cvv}
          />
        </View>
      </View>
    </Animatable.View>
  );
});

export default FormCreditCard;

const styles = StyleSheet.create({
  headerFormCardContainer: {
    ...Layout.fullWidth,
    ...Layout.rowVCenter,
    justifyContent: 'space-between',
    padding: SPACING * 1.5,
    paddingTop: 0,
  },

  save: {
    ...FontStyle.h3,
    color: Colors.Text,
  },
});
