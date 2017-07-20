module.exports = function(sequelize, DataTypes) {

  var Note = sequelize.define('Note', {
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
    {
      freezeTableName: true // Model tableName will be the same as the model name
  });

  return Note;
};
