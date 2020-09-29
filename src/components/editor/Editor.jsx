import React from 'react';
import styles from './Editor.module.css';
import { reduxForm } from 'redux-form';
import EditorFormPhone from './EditorFormPhone';
import firebase from 'firebase/app';
import { connect } from 'react-redux';

const cardsPhoneData = {
  '2G (GPRS, EDGE)': true,
  '3G (WCDMA, UMTS, HSPA)': false,
  '4G (LTE)': true,
  'goods-CPU': 'Apple A13 Bionic',
  'goods-CPU_frequency': '?',
  'goods-PC_connector': 'type-C',
  'goods-SIM_dimensions': 'nano-SIM',
  'goods-autofocus': 'Есть',
  'goods-battery_capacity': '3000 мА',
  'goods-charger_connector': 'type-C',
  'goods-combo_slot': 'Нет',
  'goods-core_type': 'не извесно',
  'goods-count_SIM_cards': '2',
  'goods-fast_charging': 'Есть',
  'goods-flash': 'Есть',
  'goods-front_camera': '7 Мп',
  'goods-headphone_jack': 'Lightning',
  'goods-main_camera': '12 Мп',
  'goods-matrix_type': 'IPS',
  'goods-maximum_contacts': 'Ограничено памятью устройства',
  'goods-maximum_memory_card': 'нет',
  'goods-maximum_num_for_contact': 'Ограничено памятью устройства',
  'goods-memory': '64 ГБ',
  'goods-memory_cards_format': 'нет',
  'goods-num_of_cores': '2+4',
  'goods-operating_system': 'iOS',
  'goods-price': '11999',
  'goods-removable_battery': 'Нет',
  'goods-screen_diagonal': '4.7',
  'goods-screen_material': 'Стекло',
  'goods-screen_resolution': '1334x750',
  'goods-title': 'Мобильный телефон Apple iPhone SE 64GB (2020) White',
  'goods-video_core': 'Не извесно',
  'goods-video_recording': '4K / 3840x2160 / стереозвук',
  'goods-wireless_charger': 'Есть',
  'goods-сamera_stabilization': 'Есть',
};

const EditorForm = reduxForm({ form: 'editorForm' })(EditorFormPhone);

// const addCard = () => {};

const Editor = (props) => {
  const { currentGoodsCode } = props;
  const db = firebase.firestore();

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const addData = () => {
    db.collection('cardsPhone')
      .doc(currentGoodsCode)
      .set(cardsPhoneData)
      .then(() => {
        console.log('Документ успешно записан!');
      })
      .catch((error) => {
        console.error('Ошибка при записи документа: ', error);
      });
  };

  const getData = () => {};

  return (
    <div className={styles.editor}>
      <button onClick={addData}>ADD</button>
      <button onClick={getData}>GET</button>
      <EditorForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentGoodsCode: state.editorPhone.currentGoodsCode,
  };
};

const mapDispathToProps = (dispath) => {
  return {};
};

export default connect(mapStateToProps, mapDispathToProps)(Editor);
