'use strict';

const CategoriesModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamp: false,
  }
  );
  return Category;
}

module.exports = CategoriesModel;

