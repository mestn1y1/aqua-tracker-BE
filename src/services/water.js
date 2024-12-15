import UserCollection from '../db/models/User.js';
import WaterCollection from '../db/models/Water.js';
import { parseDate, getStartOfMonth, getEndOfMonth, getLastDayOfMonth, getMonthName } from '../utils/dateUtils.js';

export const setWaterRate = async (
  userId,
  payload,
  options = { new: true }
) => {

  const daylyNorm = payload.curDaylyNorm;
  const updateUser = await UserCollection.findOneAndUpdate(
    { _id: userId },
    { daylyNorm },
    { ...options },
  );

  return updateUser;
};
// все що нижче писав Влад Б.
export const addWater = async (userId, date, amount, servings) => {
  const record = await WaterCollection.create({
    userId,
    date,
    amount,
    servings,
  });

  return record;
};

// Видалення запису про воду
export const deleteWater = async (recordId) => {
  const record = await WaterCollection.findByIdAndDelete(recordId);
  return record;
};

// Отримання інформації про воду за місяць
export const getWaterByMonth = async (userId, date) => {
  const requestDate = parseDate(date);
  const requestMonth = requestDate.getMonth() + 1;
  const requestYear = requestDate.getFullYear();

  const startDate = getStartOfMonth(requestYear, requestMonth);
  const endDate = getEndOfMonth(requestYear, requestMonth);

  const waterRecords = await WaterCollection.find({
    userId,
    date: { $gte: startDate, $lte: endDate },
  });

  if (waterRecords.length === 0) {
    return {
      month: getMonthName(requestMonth),
      amountWaterForMonth: 0,
      waterMonthData: [],
    };
  }

  const waterMonthData = [];
  const lastDayOfMonth = getLastDayOfMonth(requestYear, requestMonth);

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const currentDay = new Date(requestYear, requestMonth - 1, day);

    const dailyRecords = waterRecords.filter(record => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === currentDay.getFullYear() &&
        recordDate.getMonth() === currentDay.getMonth() &&
        recordDate.getDate() === currentDay.getDate()
      );
    });

    const totalWaterForDay = dailyRecords.reduce((sum, record) => sum + record.amount, 0);

    const waterDayList = dailyRecords.map(record => ({
      dateTime: record.date.toISOString(),
      amount: record.amount,
    }));

    waterMonthData.push({
      date: `${day}.${requestMonth}.${requestYear}`,
      norma: dailyRecords[0]?.curDaylyNorm || 1500,
      waterDayList,
      amountWaterForDay: totalWaterForDay,
    });
  }

  const amountWaterForMonth = waterMonthData.reduce(
    (total, dayData) => total + dayData.amountWaterForDay,
    0
  );

  return {
    month: getMonthName(requestMonth),
    amountWaterForMonth,
    waterMonthData,
  };
};

// Отримання інформації про воду за сьогодні
export const getWaterForToday = async (userId) => {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const dailyRecords = await WaterCollection.find({
    userId,
    date: { $gte: startOfToday, $lt: endOfToday },
  });

  if (dailyRecords.length === 0) {
    return {
      date: today.toISOString().split('T')[0],
      norma: 1500,
      waterDayList: [],
      amountWaterForToday: 0,
    };
  }

  const totalWaterForToday = dailyRecords.reduce((sum, record) => sum + record.amount, 0);

  const waterDayList = dailyRecords.map(record => ({
    dateTime: record.date.toISOString(),
    amount: record.amount,
  }));

  return {
    date: today.toISOString().split('T')[0],
    norma: dailyRecords[0]?.curDaylyNorm || 1500,
    waterDayList,
    amountWaterForToday: totalWaterForToday,
  };
};
