import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// GET all
export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

// GET by ID
export const getNoteById = async (req, res, next) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.json(note);
};

// POST
export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

// DELETE
export const deleteNote = async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.noteId);

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.json(note);
};

// PATCH
export const updateNote = async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(
    req.params.noteId,
    req.body,
    { new: true }
  );

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.json(note);
};