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
    public class CategoryService : ICategoryService
    {
        public readonly ICategoryData categoryData;

        public CategoryService(ICategoryData _categoryData)
        {
            categoryData = _categoryData;
        }

        public IEnumerable<Category> GetAll()
        {
            return categoryData.GetAll();
        }

        public Category GetById(int id)
        {
            return categoryData.GetById(id);
        }

        public Category GetByName(string name)
        {
            return categoryData.GetByName(name);
        }

        public async Task UpdateCategoryAsync(int id, string name)
        {
            await categoryData.UpdateCategoryAsync(id, name);
        }
        public async Task AddCategoryAsync(string name)
        {
            await categoryData.AddCategoryAsync(name);
        }

        public async Task DeleteCategoryAsync(int id)
        {
            await categoryData.DeleteCategoryAsync(id);
        }
    }
}
