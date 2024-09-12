import mongoose, { Document, Schema } from 'mongoose';

const DocumentSchema = new Schema({
    _id: String,
    data: Object,
});

const DocumentModel = mongoose.model<Document & { data: string }>('Document', DocumentSchema);

export default DocumentModel;
