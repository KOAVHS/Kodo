import { useEffect, useState } from 'react';
import * as Sensors from 'expo-sensors';

export const useLiquidEffect = () => {
  const [liquidLevel, setLiquidLevel] = useState(0);

  useEffect(() => {
    const subscription = Sensors.Accelerometer.addListener(({ x, y, z }) => {
      // Simular efecto de líquido basado en aceleración
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      setLiquidLevel(Math.min(magnitude, 1));
    });

    Sensors.Accelerometer.setUpdateInterval(100);

    return () => subscription.remove();
  }, []);

  return liquidLevel;
};
