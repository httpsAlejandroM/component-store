import filterInterface from "../interfaces/filter.interface";
import interfaceProduct from "../interfaces/product.interface"
import Products from "../models/products"
import { Document, SortOrder, Types } from 'mongoose';


type componentType = Document<unknown, {}, interfaceProduct> & interfaceProduct & {
  _id: Types.ObjectId;
}

const createDocumentsBD = async (components: interfaceProduct[]) => {
  const documentsBD = await Products.insertMany(components, {
    ordered: false,
    throwOnValidationError: true
  });
  return documentsBD
  //await Products.deleteMany()
}

const getAllComponents = async (order: string | undefined) => {
  const orderBy = sortProducts(order)
  const allComponents = await Products.find().sort(orderBy);
  return allComponents;
}

const getComponentById = async (id: string) => {
  const componentById = await Products.findById(id);
  return componentById;
}

const createComponent = async (component: interfaceProduct): Promise<componentType> => {
  const newComponent = await Products.create(component);
  return newComponent;
}

const updateComponent = async (id: string, component: interfaceProduct) => {
  const componentById = await Products.findByIdAndUpdate(id, component, { new: true });
  return componentById
}

const removeComponent = async (id: string) => {
  return await Products.findByIdAndRemove(id)
}

const applyFilters = async (name: string | undefined, category: string | undefined, brand: string | undefined, order: string | undefined) => {
  const filterOptions: filterInterface = {};

  if (name) {
    filterOptions.title = new RegExp(name, 'i');
  }
  if (category) {
    const categoryValues = category.split(",");
    const regex = categoryValues.map((categoria: string) => new RegExp(categoria, 'i'))
    filterOptions.category = { $in: regex };
  }
  if (brand) {
    const brandValues = brand.split(",");
    const regex = brandValues.map((marca: string) => new RegExp(marca, 'i'))
    filterOptions.brand = { $in: regex };
  }
  const orderBy = sortProducts(order)
  const productFiltered = await Products.find(filterOptions).sort(orderBy)
  return productFiltered
}
//   .skip((page - 1) * limit)
//   .limit(limit)

const sortProducts = (order: string | undefined) :{ [prop:string]: SortOrder } => {
  switch (order) {
    case "De A - Z":
      return {["title"]:1}
    case "De Z - A":
      return {["title"]:-1}
    case "Menor precio":
      return {["price"]:1}
    case "Mayor precio":
      return {["price"]:-1}
    default:
      return {}
  }

}


export {
  getAllComponents,
  createComponent,
  getComponentById,
  updateComponent,
  removeComponent,
  createDocumentsBD,
  applyFilters
}