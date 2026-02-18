import cors from "cors";
import express from 'express'

export const configPackages = app => {
    app.use(cors());
    app.use(express.urlencoded({ limit: "20mb", extended: true }));

    app.use(express.json({limit:"20mb"}))
}