import { createComponent, getAllComponents, getComponentById, updateComponent, removeComponent, createDocumentsBD, applyFilters, getAllCategoriesAndBrands } from "../services/components.service";
import { Request, Response } from "express";
import utils from "../utils"
import QueryInterface from "../interfaces/querys.interface";

const { responseHandler, errorHandler, componentsArray } = utils

const createBD = async (req: Request, res: Response) => {
    try {
        await createDocumentsBD(componentsArray)
        responseHandler(res, 200, "BD creada")
    } catch (error) {
        errorHandler(res, 400, "Fallo el create", error)
    }
}

const getComponents = async (req: Request, res: Response) => {
    const { title, category, brand, order, page, perPage, minPrice, maxPrice }: QueryInterface = req.query;

    try {
        if (title || category || brand || minPrice || maxPrice) {
            const { productFiltered, countQuery } = await applyFilters(req.query);
            productFiltered.length
                ? responseHandler(res, 200, productFiltered, countQuery)
                : responseHandler(res, 200, { message: "No se encontraron resultados que coincidan con su búsqueda." })
        }
        else {
            const { allComponents, countQuery } = await getAllComponents({ order, page, perPage })
            responseHandler(res, 200, allComponents, countQuery)
        }
    }
    catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}

const getCategoriesAndBrands = async (req: Request, res: Response) => {
    const {category, brand, title, minPrice, maxPrice}:QueryInterface = req.query
    try {
        const categoriesAndBrands = await getAllCategoriesAndBrands(req.query)
        responseHandler(res, 200, categoriesAndBrands)
    } catch (error) {
        errorHandler(res, 400, "Error, algo salio mal", error)
    }
}

const getComponent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const componentById = await getComponentById(id)
        responseHandler(res, 200, componentById)
    } catch (error) {
        errorHandler(res, 400, `No se encontro componente con id ${id}`)
    }
}

const postComponent = async (req: Request, res: Response) => {
    try {
        const newComponent = await createComponent(req.body)
        responseHandler(res, 200, { message: "Producto creado exitosamente", newProduct: newComponent })
    } catch (error) {
        errorHandler(res, 400, "No se pudo crear el componente", error)
    }
}

const putComponent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const updatedComponent = await updateComponent(id, req.body)
        responseHandler(res, 200, { message: "Producto modificado exitosamente", updatedComponent })
    } catch (error) {
        errorHandler(res, 400, "No se pudo crear el componente", error)
    }
}

const deleteComponent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedComponent = await removeComponent(id)
        responseHandler(res, 200, { message: "Componente eliminado correctamente", deletedComponent: deletedComponent })
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
    createBD,
    getCategoriesAndBrands
}