using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data
{
    public interface IProductData
    {
        IEnumerable<Product> GetAll();
        Product GetById(int id);
        Product GetByName(string name);
        IEnumerable<Product> GetByCategory( string name);
        IEnumerable<Product> GetBySubCategory(string subCategoryName);
        IEnumerable<Product> GetByCompany(string name);
        IEnumerable<Product> NoQuantity();
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product, int id);
        Task DeleteProductAsync(int id);
    }
}
