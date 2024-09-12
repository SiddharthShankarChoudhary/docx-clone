import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import DocumentModel from "./Document";

mongoose.connect("mongodb://localhost/google-docs-clone", {
  serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));


// Create a Socket.io server on port 3001
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Define default document value
const defaultValue = "";

// Handle socket connection
io.on("connection", (socket: Socket) => {
  socket.on("get-document", async (documentId: string) => {
    const document = await findOrCreateDocument(documentId);
    if (document) {
      socket.join(documentId);
      socket.emit("load-document", document.data); // No more error here
    }

    socket.on("send-changes", (delta: any) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data: any) => {
      // Convert object to string before updating
      const stringData = JSON.stringify(data);
      await DocumentModel.findByIdAndUpdate(documentId, { data: stringData });
    });
  });
});

// Find or create a document in MongoDB
async function findOrCreateDocument(id: string | null) {
  if (id == null) return

  const document = await DocumentModel.findById(id)
  if (document) return document
  return await DocumentModel.create({ _id: id, data: defaultValue })
}
