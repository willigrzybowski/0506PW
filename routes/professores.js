const express = require('express');
const router = express.Router();
const { Professor, Materia} = require('../models');

//Listar categoria
router.get("/", async (req, res) => {
    try {
        const professores = await Professor.findAll({
          include: [{ model: Materia, as: "Materia" }],
        });
        res.render("base", {
          title: "Professores",
          view: "professores/show",
          professores,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar alunos");
      }
});

//add nova categoria - formulário
router.get("/add", async (req, res) => {
    try {
        const materia = await Materia.findAll();
        res.render("base", {
          title: "Add Professor",
          view: "professores/add",
          materia,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar ");
      }
});

//add nova categoria - no bd
router.post("/add", async(req, res) =>{
    try {
            const { nome, materiaId } = req.body;
            await Professor.create({ nome, materiaId});
            res.redirect("/professores");
          } catch (err) {
            console.error(err);
            res.status(500).send("Erro ao adicionar professor");
          }
});

//edit categoria - formulário
router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const professor = await Professor.findByPk(id, {
          include: [{ model: Materia, as: "Materia" }],
        });
        const materias = await Materia.findAll();
        if (aluno) {
          res.render("base", {
            title: "Edit Aluno",
            view: "professores/edit",
            professor,
            materias,
          });
        } else {
          res.status(404).send("Professor não encontrado");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar professor");
      }
});

//edit categoria - no bd
router.post("/edit/:id", async(req, res) =>{
try {
        const { id } = req.params;
        const { nome, materiaId } = req.body;
        const professor = await Professor.findByPk(id);
        if (professor) {
          await professor.update({ nome, materiaId });
          res.redirect("/professores");
        } else {
          res.status(404).send("Professor não encontrado");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar o professor");
      }
});

//excluir categoria
router.post("/delete/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const professor = await Professor.findByPk(id);
        if (professor) {
          await professor.destroy();
          res.redirect("/professores");
        } else {
          res.status(404).send("Professor não encontrado");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir professor");
      }
});

module.exports = router;