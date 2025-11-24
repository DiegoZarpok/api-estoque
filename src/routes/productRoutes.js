const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints de produtos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Lista todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', controller.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Busca produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', controller.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Cria um produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               preco: { type: number }
 *               quantidade: { type: number }
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post('/', controller.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Atualiza parcialmente um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', controller.updateProduct);

/**
 * @swagger
 * /products/{id}/replace:
 *   put:
 *     tags: [Products]
 *     summary: Substitui completamente um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Produto substituído
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id/replace', controller.replaceProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Deleta um produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Produto deletado
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', controller.deleteProduct);

module.exports = router;
