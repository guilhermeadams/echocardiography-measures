const express = require('express');
const Template = require('./api/template');
const Report = require('./api/report');
const { generatePdf } = require('./api/utils/pdf');

const router = express.Router();

// Get all templates
router.get('/api/templates', async (req, res) => {
  const templates = await Template.findAll({ order: [['created_at', 'DESC']] });
  res.json(templates);
});

// Get a single template by ID
router.get('/api/templates/:id', async (req, res) => {
  const template = await Template.findByPk(req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  res.json(template);
});

// Create a new template
router.post('/api/templates', async (req, res) => {
  const { name, fields } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!fields || fields.length === 0) {
    return res.status(400).json({ message: 'At least one field is required' });
  }
  try {
    const template = await Template.create({ name, fields });
    res.json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create template' });
  }
});

// Update an existing template
router.put('/api/templates/:id', async (req, res) => {
  const { name, fields } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!fields || fields.length === 0) {
    return res.status(400).json({ message: 'At least one field is required' });
  }
  const template = await Template.findByPk(req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  try {
    template.name = name;
    template.fields = fields;
    await template.save();
    res.json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update template' });
  }
});

// Delete an existing template
router.delete('/api/templates/:id', async (req, res) => {
  const template = await Template.findByPk(req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }
  try {
    await template.destroy();
    res.json({ message: 'Template deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete template' });
  }
});

// Get all reports for a template
router.get('/api/templates/:id/reports', async (req, res) => {
  const { id } = req.params;
  const reports = await Report.findAll({ where: { template_id: id } });
  res.json(reports);
});

// Get a single report by ID
router.get('/api/reports/:id', async (req, res) => {
  const report = await Report.findByPk(req.params.id);
  if (!report) {
    return res.status(404).json({ message: 'Report not found' });