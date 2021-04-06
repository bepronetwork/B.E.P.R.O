import React from 'react';
import { useSpring, animated, spring } from 'react-spring';

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];


let getRandomImage = () => {
  return `https://media.nga.gov/iiif/a1fd5a3e-9aa7-4480-886e-dc8a2e3d2a69__640/full/!600,600/0/default.jpg`;
}
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Card({ item }) {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  const _isAvailable = item.state != 'NOT_AVAILABLE';
  const _filter = _isAvailable ? 'none' : 'none';

  let image = _isAvailable ? item.image : getRandomImage(item.id);
  return (
    <animated.img
      src={image}
      alt={item.description}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        filter: _filter,
        width: 350,
        height: 350,
        transform: _isAvailable ? props.xys.interpolate(trans) : null,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    />
  );
}

export default Card;
