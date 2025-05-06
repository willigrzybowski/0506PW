module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define("Categoria", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

      Categoria.associate = (models) => { 
        Categoria.hasMany(models.Produto, { 
          foreignKey: "categoriaId", 
          as: "produtos", 
        }); 
      };
    return Categoria;

}; 