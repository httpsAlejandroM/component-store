import interfaceProduct from "../interfaces/product.interface"
import Products from "../models/products"
import { Document, Types } from 'mongoose';


type componentType = Document<unknown, {}, interfaceProduct> & interfaceProduct & {
    _id: Types.ObjectId;
}

const createDocumentsBD = async(components:interfaceProduct[]) => {
   const documentsBD = await Products.insertMany(components,{
    ordered:false,
    throwOnValidationError:true
   });
   return documentsBD
 //await Products.deleteMany()
}

const getAllComponents = async () => {
    const allComponents = await Products.find();
    return allComponents;
}

const getComponentById = async (id:string)  => {
    const componentById = await Products.findById(id);
    return componentById;
}

const createComponent = async (component:interfaceProduct) :Promise<componentType> => {
    const newComponent = await Products.create(component);
    return newComponent;
}

const updateComponent = async (id:string, component:interfaceProduct) => {
    const componentById = await Products.findByIdAndUpdate(id, component, {new: true});
    return componentById
}

const removeComponent = async (id:string) => {
    return await Products.findByIdAndRemove(id)
}

export {
    getAllComponents,
    createComponent,
    getComponentById,
    updateComponent,
    removeComponent,
    createDocumentsBD
}