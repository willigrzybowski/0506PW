const express = require('express');
const router = express.Router();
const { Aluno, Curso, Turma } = require('../models');

//Listar categoria
router.get("/", async (req, res) => {
    try {
        const alunos = await Aluno.findAll({
          include: [{ model: Curso, as: "Curso" }],
          include: [{ model: Turma, as: "Turma" }],
        });
        res.render("base", {
          title: "Alunos",
          view: "alunos/show",
          alunos,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar alunos");
      }
});

//add nova categoria - formulário
router.get("/add", async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        const turmas = await Turma.findAll();
        res.render("base", {
          title: "Add Aluno",
          view: "alunos/add",
          cursos,
          turmas,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar curso");
      }
});

//add nova categoria - no bd
router.post("/add", async(req, res) =>{
    try {
        const { nome, idade, cursoId, turmaId } = req.body;
        await Aluno.create({ nome, idade, cursoId, turmaId });
        res.redirect("/alunos");
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao adicionar aluno");
      }
});

//edit categoria - formulário
router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const aluno = await Aluno.findByPk(id, {
          include: [{ model: Curso, as: "Curso" }],
          include: [{ model: Turma, as: "Turma" }],
        });
        const cursos = await Curso.findAll();
        const turmas = await Turma.findAll();
        if (aluno) {
          res.render("base", {
            title: "Edit Aluno",
            view: "alunos/edit",
            aluno,
            cursos,
            turmas,
          });
        } else {
          res.status(404).send("Aluno não encontrado");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao recuperar aluno");
      }
});

//edit categoria - no bd
router.post("/edit/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const { nome, idade, cursoId, turmaId } = req.body;
        const aluno = await Aluno.findByPk(id);
        if (aluno) {
          await aluno.update({ nome, idade, cursoId, turmaId });
          res.redirect("/alunos");
        } else {
          res.status(404).send("Aluno não encontrado");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar o aluno");
      }
});

//excluir categoria
router.post("/delete/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const aluno = await Aluno.findByPk(id);
        if (aluno) {
          await aluno.destroy();
          res.redirect("/alunos");
        } else {
          res.status(404).send("Aluno não encontrado");
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao excluir aluno");
      }
});

module.exports = router;