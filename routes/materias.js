const express = require('express');
const router = express.Router();
const { Materia } = require('../models');

//Listar categoria
router.get("/", async (req, res) => {
    const materias = await Materia.findAll();
    res.render(
        "base", {
            title: "Listar Materias",
            view: "materias/show",
            materias,
    });
});

//add nova categoria - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Turma",
            view: "materias/add",
    });
});

//add nova categoria - no bd
router.post("/add", async(req, res) =>{
    await Materia.create({nome: req.body.nome});
    res.redirect("/materias")
});

//edit categoria - formulário
router.get("/edit/:id", async (req, res) => {
    const materia = await Materia.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Materia",
            view: "materias/edit",
            materia,
    });
});

//edit categoria - no bd
router.post("/edit/:id", async(req, res) =>{
    await Materia.update(
        {nome: req.body.nome},
        {where:{id: req.params.id}}
    );
    res.redirect("/turmas")
});

//excluir categoria
router.post("/delete/:id", async(req, res) =>{
    await Materia.destroy({where:{id: req.params.id}});
    res.redirect("/materias")
});

module.exports = router;