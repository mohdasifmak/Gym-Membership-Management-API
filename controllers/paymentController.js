const Payment = require('../models/Payment');
const User = require('../models/User');
const Plan = require('../models/Plan');
const PDFDocument = require('pdfkit');

exports.recordPayment = async (req, res) => {
  const { planId, amount, method, transactionId } = req.body;

  const payment = new Payment({
    userId: req.user._id,
    planId,
    amount,
    method,
    transactionId
  });

  await payment.save();
  res.status(201).json(payment);
};

exports.viewAllPayments = async (req, res) => {
  const payments = await Payment.find().populate('userId planId');
  res.json(payments);
};

exports.paymentDetails = async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate('userId planId');
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json(payment);
};

exports.generateInvoice = async (req, res) => {
  const payments = await Payment.find({ userId: req.params.userId }).populate('userId planId');

  if (!payments.length) return res.status(404).json({ error: 'No payments found' });

  const latest = payments[payments.length - 1];
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=invoice-${latest._id}.pdf`);

  doc.text(`Invoice`, { align: 'center', underline: true });
  doc.moveDown();
  doc.text(`Name: ${latest.userId.name}`);
  doc.text(`Email: ${latest.userId.email}`);
  doc.text(`Plan: ${latest.planId.name}`);
  doc.text(`Amount: ₹${latest.amount}`);
  doc.text(`Payment Method: ${latest.method}`);
  doc.text(`Transaction ID: ${latest.transactionId}`);
  doc.text(`Date: ${new Date(latest.createdAt).toLocaleDateString()}`);

  doc.end();
  doc.pipe(res);
};
