const express = require('express');
const router = express.Router();
const { Categoria } = require('../models');

//Listar categoria
router.get("/", async (req, res) => {
    const categorias = await Categoria.findAll();
    res.render(
        "base", {
            title: "Listar Categorias",
            view: "categorias/show",
            categorias,
    });
});

//add nova categoria - formulário
router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Categoria",
            view: "categorias/add",
    });
});

//add nova categoria - no bd
router.post("/add", async(req, res) =>{
    await Categoria.create({nome: req.body.nome});
    res.redirect("/categorias")
});

//edit categoria - formulário
router.get("/edit/:id", async (req, res) => {
    const categoria = await Categoria.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Categoria",
            view: "categorias/edit",
            categoria,
    });
});

//edit categoria - no bd
router.post("/edit/:id", async(req, res) =>{
    await Categoria.update(
        {nome: req.body.nome},
        {where:{id: req.params.id}}
    );
    res.redirect("/categorias")
});

//excluir categoria
router.post("/delete/:id", async(req, res) =>{
    await Categoria.destroy({where:{id: req.params.id}});
    res.redirect("/categorias")
});

module.exports = router;