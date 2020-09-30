import React, { useState } from 'react';
import styles from './EditorFormPhone.module.css';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { createKey } from '../../common/functions/functions';
import { setCurrentGoodsCode } from '../../redux-store/editorPhone-reducer';

const Img = (props) => {
  return (
    <span className={styles.imgPrev_area}>
      <img
        src={props.dataSrc}
        alt={props.fileName}
        className={styles.imgPreview}
      />
      <span
        className={styles.deleteImg}
        data-file-name={props.fileName}
        onClick={props.deleteImage}
      >
        X
      </span>
    </span>
  );
};

const EditorFormPhone = (props) => {
  const { currentGoodsCode, setCurrentGoodsCode, initialValues } = props;
  // префикс товара для кода товара
  const prefixCode = 'MP';

  // стейт картинок к карточки
  const [imagesCurrentCard, setImagesCurrentCard] = useState([]);
  // console.log(imagesCurrentCard);

  // ссылка на кнопку загрузки изображений
  const inputLoad = React.createRef();
  // ссылка на область вывода миниатюр товара

  // генератор кода товара
  const generateGoodsCode = (e) => {
    e.preventDefault();
    setCurrentGoodsCode(createKey(prefixCode));
  };

  const addPicture = (dataSrc, fileName, id) => {
    setImagesCurrentCard((prev) => {
      for (let item of prev) {
        if (item.fileName === fileName) return [...prev];
      }

      const obj = {
        src: dataSrc,
        fileName: fileName,
        id: id,
      };
      return [...prev, obj];
    });
  };

  const onLoadFiles = (event) => {
    let files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const fileName = file.name;
      // console.log(file);

      const img = document.createElement('img');
      img.classList.add(styles.imgPreview);
      img.file = file;

      const render = new FileReader();
      render.onload = (function (aImg) {
        return function (e) {
          console.log(`Загружено: ${fileName}`);
          aImg.src = e.target.result;
          addPicture(e.target.result, fileName, createKey(null, 6));
        };
      })(img);
      render.readAsDataURL(file);
    }
  };

  const saveImagesToStorage = () => {
    // название коталога для карточек товаров
    const cardsPhone = 'cardsStore/cardsPhohe';
    // ссылка на корневой путь хранилище файлов
    const storageRef = firebase.storage().ref();
    // ссылка на каталог в хранилище с файлами для карточек "Смартфон"
    const cardsPhoneRef = storageRef.child(`${cardsPhone}/${currentGoodsCode}`);

    for (let item of imagesCurrentCard) {
      cardsPhoneRef
        .child(item.fileName)
        .putString(item.src, 'data_url')
        .then((snapshot) => {
          console.log(`Сохранено: ${item.fileName}`);
        });
    }
    setImagesCurrentCard([]);
  };

  const deleteImage = (event) => {
    const fileName = event.target.dataset.fileName;

    setImagesCurrentCard((prev) => {
      return [...prev.filter((elem) => elem.fileName !== fileName)];
    });
  };

  return (
    <form onSubmit={props.handleSubmit} className={styles.editorForm}>
      <h2 className={styles.titlePage}>
        Редактор карточки "Мобильные телефоны"
      </h2>
      <section className={styles.areaRow}>
        <div className={styles.areaName}>Название товара</div>
        <div className={styles.areaNameInterpretation}>
          Это название будет отображатся крупным жирным шрифтом при просмотре
          товара
        </div>

        <Field
          type="text"
          name="goodsTitle"
          component="input"
          placeholder="Название"
          className={styles.inputText}
        />
        <div className={styles.areaGoodsCode}>
          Код товара:&emsp;
          <input
            type="text"
            className={styles.inputGoodsCode}
            defaultValue={currentGoodsCode}
            disabled
          />
          {!initialValues.currentGoodsCode && (
            <button
              className={styles.btnGenerateCode}
              onClick={generateGoodsCode}
            >
              Генерировать
            </button>
          )}
        </div>
      </section>

      <section className={styles.areaRow}>
        <div className={styles.areaName}>Загрузить картинки</div>
        <input
          ref={inputLoad}
          type="file"
          accept="image/*"
          multiple
          className={styles.inputText}
          onChange={onLoadFiles}
        />
        {imagesCurrentCard.length ? (
          <div className={styles.loadImagePreview}>
            {imagesCurrentCard.map((elem) => {
              // console.log(elem);
              return (
                <Img
                  dataSrc={elem.src}
                  fileName={elem.fileName}
                  styleClass={styles.imgPreview}
                  key={elem.id}
                  id={elem.id}
                  deleteImage={deleteImage}
                />
              );
            })}
          </div>
        ) : null}
      </section>

      <section className={styles.areaRow}>
        <div className={styles.areaName}>Цена (грн)</div>
        <Field
          type="number"
          name="goodsPrice"
          component="input"
          placeholder="Цена"
          className={styles.inputText}
        />
      </section>

      <section className={styles.areaRow}>
        <div className={styles.areaName}>Краткое описание товара</div>
        <Field
          type="number"
          name="goodsShortDescription"
          component="textarea"
          placeholder="Краткое описание"
          className={styles.inputTextarea}
        />
      </section>

      <section className={styles.areaRow}>
        <div className={styles.areaName}>Длинное описание товара</div>
        <Field
          type="number"
          name="goodsLongDescription"
          component="textarea"
          placeholder="Длинное описание"
          className={styles.inputTextarea}
        />
      </section>

      <section className={styles.areaRow}>
        <div className={styles.labelArea}>Характеристики</div>
        <div className={styles.areaNameInterpretation}>
          Эти поля будут отображатся на вкладке товара "Характеристики"
        </div>
        <h3>Стандарт связи/интернет</h3>
        <div className={styles.areaName}>
          Стандарт связи
          <ul className={styles.areaCheckbox}>
            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="2G"
                  component="input"
                  className={styles.checkbox}
                />
                <span>2G</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="2G (GPRS, EDGE)"
                  component="input"
                  className={styles.checkbox}
                />
                <span>2G (GPRS, EDGE)</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="2G (GSM)"
                  component="input"
                  className={styles.checkbox}
                />
                <span>2G (GSM)</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="3G"
                  component="input"
                  className={styles.checkbox}
                />
                <span>3G</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="3G (UMTS, HSUPA, HSPA)"
                  component="input"
                  className={styles.checkbox}
                />
                <span>3G (UMTS, HSUPA, HSPA)</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="3G (WCDMA)"
                  component="input"
                  className={styles.checkbox}
                />
                <span>3G (WCDMA)</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="3G (WCDMA, UMTS, HSPA)"
                  component="input"
                  className={styles.checkbox}
                />
                <span>3G (WCDMA, UMTS, HSPA)</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="4G (LTE)"
                  component="input"
                  className={styles.checkbox}
                />
                <span>4G (LTE)</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="5G"
                  component="input"
                  className={styles.checkbox}
                />
                <span>5G</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="CDMA"
                  component="input"
                  className={styles.checkbox}
                />
                <span>CDMA</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="GPRS"
                  component="input"
                  className={styles.checkbox}
                />
                <span>GPRS</span>
              </label>
            </li>

            <li className={styles.labelForCheckbox}>
              <label>
                <Field
                  type="checkbox"
                  name="GSM"
                  component="input"
                  className={styles.checkbox}
                />
                <span>GSM</span>
              </label>
            </li>
          </ul>
        </div>

        <h3>Экран</h3>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Диагональ экрана</div>
          <Field
            type="text"
            name="goods-screen_diagonal"
            component="input"
            placeholder="Диагональ экрана"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Разрешение экрана</div>
          <Field
            type="text"
            name="goods-screen_resolution"
            component="input"
            placeholder="Разрешение экрана"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Материал экрана</div>
          <Field
            type="text"
            name="goods-screen_material"
            component="input"
            placeholder="Материал экрана"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Тип матрицы</div>
          <Field
            type="text"
            name="goods-matrix_type"
            component="input"
            placeholder="Тип матрицы"
            className={styles.inputText}
          />
        </section>

        <h3>СИМ-карты</h3>
        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Количество СИМ-карт</div>
          <Field
            type="text"
            name="goods-count_SIM_cards"
            component="input"
            placeholder="Количество СИМ-карт"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Размеры СИМ-карты</div>
          <Field
            type="text"
            name="goods-SIM_dimensions"
            component="input"
            placeholder="Размеры СИМ-карты"
            className={styles.inputText}
          />
        </section>

        <h3>Функции памяти</h3>
        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Оперативная память</div>
          <Field
            type="text"
            name="goods-RAM"
            component="input"
            placeholder="Оперативная память"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Встроенная память</div>
          <Field
            type="text"
            name="goods-memory"
            component="input"
            placeholder="Встроенная память"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Поддерживаемые карт памяти</div>
          <Field
            type="text"
            name="goods-memory_cards_format"
            component="input"
            placeholder="Поддерживаемые карт памяти"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Максимальный объем карты памяти</div>
          <Field
            type="text"
            name="goods-maximum_memory_card"
            component="input"
            placeholder="Максимальный объем карты памяти"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>
            Количество контактов в телефонной книге
          </div>
          <Field
            type="text"
            name="goods-maximum_contacts"
            component="input"
            placeholder="Количество контактов в телефонной книге"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Количество номеров на 1 контакт</div>
          <Field
            type="text"
            name="goods-maximum_num_for_contact"
            component="input"
            placeholder="Количество номеров на 1 контакт"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Комбинированный слот</div>
          <Field
            type="text"
            name="goods-combo_slot"
            component="input"
            placeholder="Комбинированный слот"
            className={styles.inputText}
          />
        </section>

        <h3>Операционная система</h3>
        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Операционная система</div>
          <Field
            type="text"
            name="goods-operating_system"
            component="input"
            placeholder="Операционная система"
            className={styles.inputText}
          />
        </section>

        <h3>Фронтальная камера</h3>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Фронтальная камера</div>
          <Field
            type="text"
            name="goods-front_camera"
            component="input"
            placeholder="Фронтальная камера"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Стабилизация</div>
          <Field
            type="text"
            name="goods-сamera_stabilization"
            component="input"
            placeholder="Стабилизация"
            className={styles.inputText}
          />
        </section>

        <h3>Процессор</h3>
        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Процессор</div>
          <Field
            type="text"
            name="goods-CPU"
            component="input"
            placeholder="Процессор"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Тип ядра</div>
          <Field
            type="text"
            name="goods-core_type"
            component="input"
            placeholder="Тип ядра"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Видеоядро</div>
          <Field
            type="text"
            name="goods-video_core"
            component="input"
            placeholder="Видеоядро"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Количество ядер</div>
          <Field
            type="text"
            name="goods-num_of_cores"
            component="input"
            placeholder="Количество ядер"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Частота процессора</div>
          <Field
            type="text"
            name="goods-CPU_frequency"
            component="input"
            placeholder="Частота процессора"
            className={styles.inputText}
          />
        </section>

        <h3>Основная камера</h3>
        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Основная камера</div>
          <Field
            type="text"
            name="goods-main_camera"
            component="input"
            placeholder="Основная камера"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Вспышка</div>
          <Field
            type="text"
            name="goods-flash"
            component="input"
            placeholder="Вспышка"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Запись видео</div>
          <Field
            type="text"
            name="goods-video_recording"
            component="input"
            placeholder="Запись видео"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Автофокус</div>
          <Field
            type="text"
            name="goods-autofocus"
            component="input"
            placeholder="Автофокус"
            className={styles.inputText}
          />
        </section>

        <h3>Питание</h3>
        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Емкость аккумулятора</div>
          <Field
            type="text"
            name="goods-battery_capacity"
            component="input"
            placeholder="Емкость аккумулятора"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>
            Возможность беспроводной зарядки
          </div>
          <Field
            type="text"
            name="goods-wireless_charger"
            component="input"
            placeholder="Возможность беспроводной зарядки"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Быстрая зарядка</div>
          <Field
            type="text"
            name="goods-fast_charging"
            component="input"
            placeholder="Быстрая зарядка"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Съемная АКБ</div>
          <Field
            type="text"
            name="goods-removable_battery"
            component="input"
            placeholder="Съемная АКБ"
            className={styles.inputText}
          />
        </section>

        <h3>Разъемы</h3>
        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Разъем зарядного устройства</div>
          <Field
            type="text"
            name="goods-charger_connector"
            component="input"
            placeholder="Разъем зарядного устройства"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Разъем для подключения к ПК</div>
          <Field
            type="text"
            name="goods-PC_connector"
            component="input"
            placeholder="Разъем для подключения к ПК"
            className={styles.inputText}
          />
        </section>

        <section className={styles.areaRow_inner}>
          <div className={styles.areaName}>Разъем для наушников</div>
          <Field
            type="text"
            name="goods-headphone_jack"
            component="input"
            placeholder="Разъем для наушников"
            className={styles.inputText}
          />
        </section>
      </section>

      <button type="submit" onClick={saveImagesToStorage}>
        Сохранить
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    currentGoodsCode: state.editorPhone.currentGoodsCode,
  };
};

const mapDispathToProps = (dispath) => {
  return {
    setCurrentGoodsCode: (code) => {
      dispath(setCurrentGoodsCode(code));
    },
  };
};

export default connect(mapStateToProps, mapDispathToProps)(EditorFormPhone);
