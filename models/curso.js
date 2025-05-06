module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define("Curso", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

   
 
    return Curso;

}; 