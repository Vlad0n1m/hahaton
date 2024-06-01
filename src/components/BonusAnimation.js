import React, { useEffect, useState } from 'react';

const BonusAnimation = ({ points }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000); // Длительность анимации должна совпадать с CSS-анимацией (1s)

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bonus-animation">
      +{points}
    </div>
  );
};

export default BonusAnimation;
    