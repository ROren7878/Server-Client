using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;
using Microsoft.EntityFrameworkCore;

namespace Data.Data
{
    public class ProductData :IProductData
    {
        public readonly DataContext dataContext;

        public ProductData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public IEnumerable<Product> GetAll()
        {
            return dataContext.products
                                .Include(p => p.Category)
                                .Include(p => p.Company)
                                .Include(p => p.SubCategory);
        }

        public IEnumerable<Product> GetByCategory(string name)
        {
            return dataContext.products
                                    .Include(p => p.Category)
                                    .Where(p => p.Category != null && p.Category.Name == name)
                                                    .Include(p => p.Company)
                                                    .Include(p => p.SubCategory) ;
        }

        public IEnumerable<Product> GetBySubCategory(string subCategoryName)
        {
            return dataContext.products
                                    .Include(p => p.SubCategory)
                                    .Where(p => p.SubCategory != null && p.SubCategory.Name == subCategoryName)
                                                    .Include(p => p.Company)
                                                    .Include(p => p.Category);
        }

        public IEnumerable<Product> GetByCompany(string name)
        {
            return dataContext.products
                                .Include(p => p.Company)
                                .Where(p => p.Company != null && p.Company.Name == name)
                                .Include(p => p.Category)
                                .Include(p => p.SubCategory);
        }


        public Product GetById(int id)
        {
            return dataContext.products
                                .Include(p => p.Category)
                                .Include(p => p.Company)
                                .Include(p => p.SubCategory)
                                .FirstOrDefault(p => p.Id == id);
        }

        public Product GetByName(string name)
        {
            return dataContext.products
                                .Include(p => p.Category)
                                .Include(p => p.Company)
                                .Include(p => p.SubCategory)
                .FirstOrDefault(p => p.ProductName.ToLower() == name.ToLower());
        }
        public IEnumerable<Product> NoQuantity()
        {
            return dataContext.products
                                .Where(p => p.Quantity == 0)
                                .Include(p => p.Category)
                                .Include(p => p.Company)
                                .Include(p => p.SubCategory)
                                .ToList();
        }

        public async Task UpdateProductAsync(Product product, int id)
        {
            var p = await dataContext.products.FirstOrDefaultAsync(x => x.Id == id);
            if (p != null)
            {
                p.ProductName = product.ProductName;
                p.Desc = product.Desc;
                p.Price = product.Price;
                p.Quantity = product.Quantity;
                p.Src = product.Src;
                p.CategoryId = product.CategoryId;
                p.CompanyId = product.CompanyId;
                p.SubCategoryId = product.SubCategoryId;

                // טען את האובייקטים מחדש (למקרה שצריך אותם ב־DTO בהמשך)
                if (p.CompanyId.HasValue)
                    p.Company = await dataContext.companies.FindAsync(p.CompanyId.Value);

                if (p.CategoryId.HasValue)
                    p.Category = await dataContext.categories.FindAsync(p.CategoryId.Value);

                if (p.SubCategoryId.HasValue)
                    p.SubCategory = await dataContext.subcategories.FindAsync(p.SubCategoryId.Value);

                await dataContext.SaveChangesAsync();
            }
            //var p = await dataContext.products.FirstOrDefaultAsync(x => x.Id == id);
            //if (p != null)
            //{
            //    p.ProductName = product.ProductName;
            //    p.Desc = product.Desc;
            //    p.Price = product.Price;
            //    p.Quantity = product.Quantity;
            //    p.CategoryId = product.CategoryId;
            //    p.Src = product.Src;

            //    await dataContext.SaveChangesAsync();
            //}
        }

        public async Task AddProductAsync(Product product)
        {
            if (product.CompanyId.HasValue)
                product.Company = await dataContext.companies.FindAsync(product.CompanyId.Value);

            if (product.CategoryId.HasValue)
                product.Category = await dataContext.categories.FindAsync(product.CategoryId.Value);

            if (product.SubCategoryId.HasValue)
                product.SubCategory = await dataContext.subcategories.FindAsync(product.SubCategoryId.Value);

            dataContext.products.Add(product);
            await dataContext.SaveChangesAsync();

            //dataContext.products.Add(product);
            //await dataContext.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            Product product = dataContext.products.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                dataContext.products.Remove(product);
            }
            await dataContext.SaveChangesAsync();
        }

    }
}
