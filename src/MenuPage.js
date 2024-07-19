import React, { useState, useRef } from 'react';
import { scroller } from 'react-scroll';
import './MenuPage.css'; // Добавьте файл стилей

const categories = [
    {
      name: 'Мечи', 
      items: [
        {
          name: 'Деревянный меч',
          description: 'Для всех',
          price: 1,
          image: '/images/woodensword.png',
        },
        {
          name: 'Каменный меч',
          description: 'Тоже  посильнее',
          price: 3,
          image: '/images/rocksword.png',
        },
        {
          name: 'Железный меч',
          description: '/kit start',
          price: 5,
          image: '/images/metalsword.png',
        },
        {
          name: 'Алмазный меч',
          description: 'База??????',
          price: 21,
          image: '/images/diamondsword.png',
        },
        {
          name: 'Незеритовый меч',
          description: 'Для мощных',
          price: 50,
          image: '/images/nethersword.png',
        },
      ],
    },
  
    {
      name: 'Кирки', 
      items: [
        {
          name: 'Деревянная кирка',
          description: 'Для шахтеров',
          price: 1,
          image: '/images/syrnaya.jpg',
        },
        {
          name: 'Каменная кирка',
          description: 'Для абдуса',
          price: 2,
          image: '/images/pepperoni-fresh.jpg',
        },
        {
          name: 'Железная кирка',
          description: '/kit start',
          price: 7,
          image: '/images/dvoynoy-cyplionok.jpg',
        },
        {
          name: 'Алмазная кирка',
          description: 'Не забудь на шелк зачарить',
          price: 9,
          image: '/images/vetchina-i-syr.jpg',
        },
        {
          name: 'Незеритовая кирка',
          description: 'зачем',
          price: 30,
          image: '/images/choriso-fresh.jpg',
        },
      ],
    },
  
    {
      name: 'Стрелялки', 
      items: [
        {
          name: 'Лук',
          description: 'Для дуэли со скелетом',
          price: 3,
          image: '/images/syrnaya.jpg',
        },
        {
          name: 'Арбалет',
          description: 'у разбойника',
          price: 8,
          image: '/images/pepperoni-fresh.jpg',
        },
        {
          name: 'Снежки',
          description: 'ты че?',
          price: 1,
          image: '/images/dvoynoy-cyplionok.jpg',
        },
        {
          name: 'Трезубец',
          description: 'На тягуна зачарь',
          price: 21,
          image: '/images/vetchina-i-syr.jpg',
        },
      ],
    },
  ];

const MenuPage = () => {
  const [cart, setCart] = useState([]);
  const categoryRefs = useRef(categories.reduce((acc, value) => {
    acc[value.name] = React.createRef();
    return acc;
  }, {}));

  const scrollToCategory = (categoryName) => {
    scroller.scrollTo(categoryName, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const itemInCart = prevCart.find(cartItem => cartItem.name === item.name);
      if (itemInCart) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.quantity + 1) * cartItem.price }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, total: item.price }];
      }
    });
  };

  const increaseQuantity = (item) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.quantity + 1) * cartItem.price }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (item) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity - 1, total: (cartItem.quantity - 1) * cartItem.price }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0)
    );
  };

  return (
    <div>
      <nav>
        {categories.map(category => (
          <button key={category.name} onClick={() => scrollToCategory(category.name)}>
            {category.name}
          </button>
        ))}
      </nav>
      <div className="content">
        {categories.map(category => (
          <div key={category.name} ref={categoryRefs.current[category.name]} id={category.name}>
            <h2>{category.name}</h2>
            <ul>
              {category.items.map(item => (
                <li key={item.name}>
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>от {item.price} ₽</p>
                  <div className="cart-buttons">
                    {cart.some(cartItem => cartItem.name === item.name) ? (
                      <>
                        <div className="button-container">
                          <button onClick={() => decreaseQuantity(item)}>-</button>
                        </div>
                        <div className="button-container">
                          <span>{cart.find(cartItem => cartItem.name === item.name).quantity}</span>
                        </div>
                        <div className="button-container">
                          <button onClick={() => increaseQuantity(item)}>+</button>
                        </div>
                      </>
                    ) : (
                      <div className="button-container">
                        <button onClick={() => addToCart(item)}>В корзину</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
