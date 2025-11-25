import { itemModel } from "../model/itemModel.js";

export const addPost = async (req, res) => {
  try {
    const { name, age, detail, number, professional } = req.body;

    if (!name || !age || !detail || !number || !professional) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await itemModel.findOne({ name });
    if (exist) {
      return res.status(409).json({ message: "Item already exists" });
    }

    const data = await itemModel.create({
      name,
      age,
      detail,
      number,
      professional,
    });

    console.log(data);
    res.status(201).json({ message: "Item added successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
    console.log(err);
  }
};

export const PostList = async (req, res) => {
  try {
    const data = await itemModel.find();
    res.status(200).json({ message: "Success", data });
    console.log(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

export const DeletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const deleted = await itemModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(405).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });

    console.log(err);
  }
};

export const editPost = async (req, res) => {
  try {
    const { id, name, age, detail, number, professional } = req.body;

    if (!id || !name || !age || !detail || !number || !professional) {
      return res.status(401).json({ message: "Item ID is required" });
    }

    const exist = await itemModel.findById(id);

    if (!exist) {
      return res.status(404).json({ message: "Item does not exist" });
    }

    const update = await itemModel.findByIdAndUpdate(
      id,
      { name, age, detail, number, professional },
      { new: true }
    );

    res.status(200).json({ message: "Item updated successfully", update });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};
