const express = require('express');
const router = express.Router();
const prisma = require('../Prisma/prisma');

/**
 * CREATE FORM
 */
router.post('/api/dashboard/form', async (req, res) => {
  try {
    const { title, description, isPublic, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({
        success: false,
        message: 'title and userId are required'
      });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const form = await prisma.form.create({
      data: {
        title,
        description,
        slug,
        isPublic: isPublic ?? false,
        userId
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Form created successfully',
      data: form
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});


router.get('/api/dashboard/form/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const forms = await prisma.form.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({
      success: true,
      count: forms.length,
      data: forms
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});


router.put('/api/dashboard/form/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    const { title, description, isPublic } = req.body;

    const updatedForm = await prisma.form.update({
      where: { formId },
      data: {
        title,
        description,
        isPublic
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Form updated successfully',
      data: updatedForm
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Form not found'
    });
  }
});


router.delete('/api/dashboard/form/:formId', async (req, res) => {
  try {
    const { formId } = req.params;

    await prisma.form.delete({
      where: { formId }
    });

    return res.status(204).json({  message: 'Form deleted successfully'});
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'Form not found'
    });
  }
});

module.exports = router;
