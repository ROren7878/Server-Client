using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;
using Core.Service;


namespace Service
{
    public class ProductService : IProductService
    {
        private readonly IProductData productData;
        private readonly ICategoryData categoryRepo;
        private readonly ISubCategoryData subCategoryRepo;
        private readonly ICompanyData companyRepo;

        public ProductService(
            IProductData productData,
            ICategoryData categoryRepo,
            ISubCategoryData subCategoryRepo,
            ICompanyData companyRepo)
        {
            this.productData = productData;
            this.categoryRepo = categoryRepo;
            this.subCategoryRepo = subCategoryRepo;
            this.companyRepo = companyRepo;
        }


        public IEnumerable<Product> GetAll()
        {
            return productData.GetAll();
        }

        public IEnumerable<Product> GetByCategory(string name)
        {
            return productData.GetByCategory(name);
        }
        public IEnumerable<Product> GetBySubCategory(string subCategoryName)
        {
            return productData.GetBySubCategory(subCategoryName);
        }

        public IEnumerable<Product> GetByCompany(string name)
        {
            return productData.GetByCompany(name);
        }

        public Product GetById(int id)
        {
            return productData.GetById(id);
        }

        public Product GetByName(string name)
        {
            return productData.GetByName(name);
        }

        public IEnumerable<Product> NoQuantity()
        {
            return productData.NoQuantity();
        }

        public async Task UpdateProductAsync(Product product, int id)
        {
            await productData.UpdateProductAsync(product,id);
        }

        public async Task AddProductAsync(Product product)
        {
            //if (product.CategoryId.HasValue)
            //{
            //    var category = categoryRepo.GetById(product.CategoryId.Value);
            //    product.Category.Name = category?.Name;
            //}

            //if (product.SubCategoryId.HasValue)
            //{
            //    var sub = subCategoryRepo.GetById(product.SubCategoryId.Value);
            //    product.SubCategory.Name = sub?.Name;
            //}

            //if (product.CompanyId.HasValue)
            //{
            //    var company = companyRepo.GetById(product.CompanyId.Value);
            //    product.Company.Name = company?.Name;
            //}

            await productData.AddProductAsync(product);
        }


        public async Task DeleteProductAsync(int id)
        {
            await productData.DeleteProductAsync(id);
        }


    }
}
