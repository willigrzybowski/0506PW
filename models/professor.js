module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define("Professor", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Professor.associate = (models) => {
        Professor.belongsTo(models.Materia, {
          foreignKey: "materiaId",
          as: "Materia", 
        });
      };

    
    return Professor;

}; 