import mongoose from "mongoose";

// Create a new document
export const createDocument = async (model, data) => {
  const document = new model(data);
  return await document.save();
};

// Get a document by ID
export const getDocumentById = async (model, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await model.findById(id);
};

// Get a document by query (e.g., finding by email or other fields)
export const getDocumentByQuery = async (model, query, selectFields = "") => {
  return await model.findOne(query).select(selectFields);
};

// Get multiple documents by query
export const getDocuments = async (model, query = {}, options = {}) => {
  return await model.find(query, null, options);
};

// Get multiple documents by query with pagination
export const getDocumentsWithPagination = async (
  model,
  query = {},
  options = {}
) => {
  const {
    populateFields = [],
    sortField,
    sortOrder,
    lean = true,
    page = 1,
    limit = 10,
  } = options;

  const paginationOptions = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    lean,
    populate: populateFields,
    sort: { [sortField]: parseInt(sortOrder, 10), createdAt: -1 },
  };
  return await model.paginate(query, paginationOptions);
};

// Update a document by ID
export const updateDocumentById = async (model, id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await model.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a document by ID
export const deleteDocumentById = async (model, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  return await model.findByIdAndDelete(id);
};

// Upsert a document (create if not found, update if exists)
export const upsertDocument = async (model, query, updateData) => {
  return await model.findOneAndUpdate(query, updateData, {
    new: true,
    upsert: true,
  });
};
