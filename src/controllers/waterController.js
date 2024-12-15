import { addWater, deleteWater, getWaterByMonth, getWaterForToday } from '../services/water.js';

// тут додаєм запис про воду
export const addWaterController = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { date, amount, servings } = req.body;

    const record = await addWater(userId, date, amount, servings);

    res.status(201).json({
      status: 'success',
      message: 'Water record added successfully',
      record,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error adding water record',
      error: error.message,
    });
  }
};

// тут видаляємо запис про воду
export const deleteWaterController = async (req, res) => {
  try {
    const { recordId } = req.params;

    const record = await deleteWater(recordId);

    if (!record) {
      return res.status(404).json({
        status: 'fail',
        message: 'Record not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Water record deleted successfully',
      record,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting water record',
      error: error.message,
    });
  }
};

// тут отримуєм інфу  про воду за місяць
export const getWaterByMonthController = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { date } = req.query;

    const result = await getWaterByMonth(userId, date);

    if (!result || !result.waterMonthData.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'No water records found for the given month',
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving water records for the month',
      error: error.message,
    });
  }
};

// тут отримуєм інфу про воду за сьогодні
export const getWaterTodayController = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const result = await getWaterForToday(userId);

    res.json({
      status: 'success',
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving water records for today',
      error: error.message,
    });
  }
};
