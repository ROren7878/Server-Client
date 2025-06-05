using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data
{
    public interface ICategoryData
    {
        IEnumerable<Category> GetAll();
        Category GetById(int id);
        Category GetByName(string name);
        Task AddCategoryAsync(string name);
        Task UpdateCategoryAsync(int id, string name);
        Task DeleteCategoryAsync(int id);
    }
}
