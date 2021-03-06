import React, { useState } from 'react';
import styles from './EditorPhone.module.css';
import { reduxForm } from 'redux-form';
import EditorFormPhone from './EditorFormPhone';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import TabSwitcher from '../tab-switcher/TabSwitcher';
import ViewerPhone from '../viewer-phone/ViewerPhone';

const EditorForm = reduxForm({ form: 'editorForm' })(EditorFormPhone);

// const addCard = () => {};

const Editor = (props) => {
  const { currentGoodsCode, initialValues } = props;
  const [editModeTabSwitcher, setEditModeTabSwitcher] = useState(false);
  const db = firebase.firestore();

  const onSubmit = (formData) => {
    const data = { ...formData, currentGoodsCode };
    if (!(data['goodsTitle'] && data.currentGoodsCode)) {
      alert('Заполнение полей "название товара" и "код" обязательно!');
      return;
    }
    console.log(data);

    db.collection('cardsPhone')
      .doc(currentGoodsCode)
      .set(data)
      .then(() => {
        console.log('Документ успешно записан!');
      })
      .catch((error) => {
        console.error('Ошибка при записи документа: ', error);
      });
  };

  return (
    <div className={styles.editorPhone}>
      <TabSwitcher
        setEditModeTabSwitcher={setEditModeTabSwitcher}
        editModeTabSwitcher={editModeTabSwitcher}
      />
      {editModeTabSwitcher ? (
        <EditorForm onSubmit={onSubmit} initialValues={initialValues} />
      ) : (
        <ViewerPhone />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentGoodsCode: state.editorPhone.currentGoodsCode,
    initialValues: state.editorPhone.initialValues,
  };
};

const mapDispathToProps = (dispath) => {
  return {};
};

export default connect(mapStateToProps, mapDispathToProps)(Editor);
