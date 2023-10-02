import { createComponent, getAllComponents, getComponentById, updateComponent, removeComponent, createDocumentsBD } from "../services/components.service";
import { Request, Response  } from "express";
import utils from "../utils"

const { responseHandler, errorHandler, componentsArray} = utils

const createBD = async (req:Request, res:Response) => {    
    try {
        await createDocumentsBD(componentsArray)
        responseHandler(res, 200, "BD creada")
    } catch (error) {
        errorHandler(res, 400, "Fallo el create", error)
    }
}

const getComponents = async (req:Request, res:Response) => {
    try {
        const products = await getAllComponents()
        responseHandler(res, 200, products)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal")
    }
}

const getComponent = async (req:Request, res:Response) => {
    const {id} = req.params
    try {
        const componentById = await getComponentById(id)
        responseHandler(res, 200, componentById)
    } catch (error) {
        errorHandler(res, 400, `No se encontro componente con id ${id}`)
    }
}

const postComponent = async (req:Request, res:Response) => {
    try {
        const newComponent = await createComponent(req.body)
        responseHandler(res, 200, {message:"Producto creado exitosamente", newProduct:newComponent})
    } catch (error) {
        errorHandler(res, 400, "No se pudo crear el componente", error)
    }
}

const putComponent = async (req:Request, res:Response) => {
    const { id } = req.params
    try {
        const updatedComponent = await updateComponent( id, req.body)
        responseHandler(res, 200, {message:"Producto modificado exitosamente", updatedComponent})
    } catch (error) {
        errorHandler(res, 400, "No se pudo crear el componente", error)
    }
}

const deleteComponent = async (req:Request, res:Response) => {
    const { id } = req.params
    try {
        const deletedComponent = await removeComponent(id)
        responseHandler(res, 200, {message:"Componente eliminado correctamente", deletedComponent:deletedComponent})
    } catch (error) {
        errorHandler(res, 400, "No se pudo crear el componente", error)
    }
}

export {
    getComponents,
    postComponent,
    getComponent,
    putComponent,
    deleteComponent,
    createBD
}