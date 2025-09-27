//
import Note from "../models/Note.js";

// GET all notes for the logged-in user
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({
      createdAt: -1,
    }); // -1 will sort in desc. order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error retrieving all notes. ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET a single note (making sure it belongs to the user)
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller. ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE a note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      userId: req.user.id, // logged in user
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE a note (only if it belongs to the user)
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // check ownership
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Unable to update note. ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE a note (only if it belongs to the user)
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Unable to delete note. ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
