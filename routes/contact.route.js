import { Router } from "express";
import { createContact } from "../controllers/contact/create.contact.js";
import { getAllContacts } from "../controllers/contact/getAll.contact.js";
import { toggleReadContact } from "../controllers/contact/toggleRead.contact.js";
import { deleteContact } from "../controllers/contact/delete.contact.js";
import { optionalAuthMiddleware } from "../middleware/optionalAuthMiddleware.js";

export const ContactRouter = new Router();

// Public route - optionalAuth to link user if logged in
ContactRouter.post("/", optionalAuthMiddleware, createContact);

// Dashboard routes
ContactRouter.get("/", getAllContacts);
ContactRouter.patch("/:id/read", toggleReadContact);
ContactRouter.delete("/:id", deleteContact);
