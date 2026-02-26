import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

/* ================= ADD PRODUCT ================= */
// POST : /api/product/add
export const addProduct = async (req, res) => {
  try {
    // Add detailed logging
    console.log("📦 req.body:", req.body);
    console.log("📁 req.files:", req.files);

    // Check if productData exists
    if (!req.body.productData) {
      return res.status(400).json({
        success: false,
        message: "Product data is required",
      });
    }

    // Parse product data
    let productData;
    try {
      productData = JSON.parse(req.body.productData);
      console.log("✅ Parsed productData:", productData);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format in productData",
      });
    }

    // Check if images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const images = req.files;

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }
      })
    );

    console.log("☁️ Uploaded images:", imagesUrl);

    // Create product in database
    const product = await Product.create({
      ...productData,
      image: imagesUrl,
    });

    console.log("✅ Product created:", product);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("❌ Add Product Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

/* ================= PRODUCT LIST ================= */
// GET : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("❌ Product List Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

/* ================= PRODUCT BY ID ================= */
// GET : /api/product/:id
export const productById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("❌ Product By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

/* ================= CHANGE STOCK ================= */
// POST : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (typeof inStock !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "inStock must be a boolean value",
      });
    }

    // Update product
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true } // Return updated document
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product stock updated successfully",
      product,
    });
  } catch (error) {
    console.error("❌ Change Stock Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update stock",
    });
  }
};