import React from 'react';
import styles from './ViewerPhone.module.css';
import defaultImage from '../../access/images/default-product-image.jpg';

const ViewerPhone = () => {
  return (
    <div className={styles.viewerPhone}>
      <h2>Просмотр товаров "Мобильные телефоны"</h2>
      <ul className={styles.productsList}>
        <li className={styles.productsItem}>
          <div className={styles.productPicture}>
            <img src={defaultImage} alt="" className={styles.picture} />
          </div>
          <div className={styles.right}>
            <h3 className={styles.productName}>
              Мобильный телефон Samsung Galaxy M31s 6/128GB Blue
            </h3>
            <div className={styles.other}>
              <div className={styles.dateCreations}>
                Создано:
                <span>23.10.2020</span>
                <span>23:16:35</span>
              </div>
              <div className={styles.buttons} data-code-product="">
                <button className={styles.btnEdit}>Редактировать</button>
                <button className={styles.btnDelete}>Удалить</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ViewerPhone;
