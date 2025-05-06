module.exports = (sequelize, DataTypes) => {
    const Materia = sequelize.define("Materia", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

      Materia.associate = (models) => { 
        Materia.hasMany(models.Professor, { 
          foreignKey: "professorId", 
          as: "professores", 
        }); 
      };
      
    return Materia;

}; 