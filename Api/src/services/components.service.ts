import filterInterface from "../interfaces/filter.interface";
import interfaceProduct from "../interfaces/product.interface"
import QueryInterface from "../interfaces/querys.interface";
import Products from "../models/products"
import mongoose, { Document, SortOrder, Types } from 'mongoose';


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

const getAllComponents = async ({ order, page = 1, perPage = 12 }: QueryInterface) => {
  const orderBy = sortProducts(order)
  const countQuery = await Products.countDocuments()
  const allComponents = await Products.find().sort(orderBy).skip((page - 1) * perPage).limit(perPage)
  return {
    allComponents,
    countQuery
  }
}


const getComponentById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { message: `El Id ${id} no es válido` }
  }

  const componentById = await Products.findById(id);
  if (componentById) return componentById
  else return { message: `No se encontro componente con id ${id}` }

}

const createComponent = async (component: interfaceProduct | any) => {
    const alreadyExist = await Products.find({ title: component.title })
    if (alreadyExist[0]) {
      return { message: `Ya existe producto con el titulo ${component.title}` }
    }
    else {
      const newComponent = await Products.create(component);
      return { message: "Producto creado exitosamente", newProduct: newComponent }
    }
  
}

const updateComponent = async (id: string, component: interfaceProduct) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return { message: `El Id ${id} no es válido` }

  const updatedComponent = await Products.findByIdAndUpdate(id, component, { new: true });

  if (updatedComponent) return { message: "Producto modificado exitosamente", updatedComponent }

  else return { message: `No se encontro producto con el Id ${id}` }


}

const removeComponent = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return { message: `El Id ${id} no es válido` }
  
  const deletedComponent = await Products.findByIdAndRemove(id)

  if (deletedComponent) return { message: "Componente eliminado correctamente" }

  else return { message: `No se encontro producto con el id ${id}` }

}

const applyFilters = async ({ title, category, brand, order, page = 1, perPage = 12, minPrice, maxPrice }: QueryInterface) => {
  const filterOptions: filterInterface = {};
  if (title) filterOptions.title = new RegExp(title, 'i');

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

  if (minPrice) filterOptions.price = { $gte: minPrice };

  if (maxPrice) filterOptions.price = { ...filterOptions.price, $lte: maxPrice };


  const countQuery = await Products.countDocuments(filterOptions)
  const orderBy = sortProducts(order)
  const productFiltered = await Products.find(filterOptions).sort(orderBy).skip((page - 1) * perPage).limit(perPage)
  return {
    productFiltered,
    countQuery
  }
}

const sortProducts = (order: string | undefined): { [prop: string]: SortOrder } => {
  switch (order) {
    case "De A - Z":
      return { ["title"]: 1 }
    case "De Z - A":
      return { ["title"]: -1 }
    case "Menor precio":
      return { ["price"]: 1 }
    case "Mayor precio":
      return { ["price"]: -1 }
    default:
      return {}
  }

}

//   const aggregatePipeline: any[] = [];

//   if (category || brand) {
//     const matchStage: any = {};

//     if (category) {
//       matchStage.category = category;
//     }

//     if (brand) {
//       matchStage.brand = brand;
//     }

//     aggregatePipeline.push({
//       $match: matchStage
//     });
//   }

//   const allCategories = await Products.aggregate([
//     ...aggregatePipeline,
//     {
//       $group: {
//         _id: "$category",
//         count: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         category: "$_id",
//         count: 1
//       }
//     },
//     {
//       $sort: {
//         category: 1
//       }
//     }
//   ]);

//   const allBrands = await Products.aggregate([
//     ...aggregatePipeline,
//     {
//       $group: {
//         _id: "$brand",
//         count: { $sum: 1 }
//       }
//     },
//     {
//       $project: {
//         _id: 0,
//         brand: "$_id",
//         count: 1
//       }
//     },
//     {
//       $sort: {
//         brand: 1
//       }
//     }
//   ]);

//   const allCategoriesAndBrands = {
//     categories: allCategories,
//     brands: allBrands
//   };

//   return allCategoriesAndBrands;
// };

const getAllCategoriesAndBrands = async ({ category, brand, title, minPrice, maxPrice }: QueryInterface) => {
  const aggregatePipeline: any[] = [];

  if (category || brand || title || minPrice || maxPrice) {
    const matchStage: any = {};

    if (category) matchStage.category = category;

    if (brand) matchStage.brand = brand;

    if (title) matchStage.title = new RegExp(title, 'i');

    if (minPrice) matchStage.price = { $gte: Number(minPrice) };

    if (maxPrice) matchStage.price = { ...matchStage.price, $lte: Number(maxPrice) };

    aggregatePipeline.push({
      $match: matchStage
    });
  }

  const allCategories = await Products.aggregate([
    ...aggregatePipeline,
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1
      }
    },
    {
      $sort: {
        category: 1
      }
    }
  ]);

  const allBrands = await Products.aggregate([
    ...aggregatePipeline,
    {
      $group: {
        _id: "$brand",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        brand: "$_id",
        count: 1
      }
    },
    {
      $sort: {
        brand: 1
      }
    }
  ]);

  const allCategoriesAndBrands = {
    categories: allCategories,
    brands: allBrands
  };

  return allCategoriesAndBrands;
};

const pushReview = async (productId: string, reviewId: string) => {
  await Products.findByIdAndUpdate(productId, {
    $push: { reviews: reviewId }
  })
}

export {
  getAllComponents,
  createComponent,
  getComponentById,
  updateComponent,
  removeComponent,
  createDocumentsBD,
  applyFilters,
  getAllCategoriesAndBrands,
  pushReview
}