module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define("Produto", {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Produto.associate = (models) => {
      // O alias deve ser 'Categoria' para corresponder ao alias na consulta
      Produto.belongsTo(models.Categoria, {
        foreignKey: "categoriaId",
        as: "Categoria", // Use o alias consistente com as consultas
      });
    };
  
    return Produto;
  };
  