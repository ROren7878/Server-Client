using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;

namespace Data.Data
{
    public class CategoryData : ICategoryData
    {
        public readonly DataContext dataContext;

        public CategoryData(DataContext _dataContext) { 
            dataContext = _dataContext;
        }

        public IEnumerable<Category> GetAll()
        {
            return dataContext.categories.ToList();
        }

        public Category GetById(int id)
        {
            return dataContext.categories.FirstOrDefault(x => x.Id == id);
        }

        public Category GetByName(string name)
        {
            return dataContext.categories.FirstOrDefault(x => x.Name == name);
        }

        public async Task UpdateCategoryAsync(int id, string name)
        {
            Category c = dataContext.categories.FirstOrDefault(c => c.Id == id);
            if (c != null)
            {
                c.Name = name;
            }
            await dataContext.SaveChangesAsync();
        }
        public async Task AddCategoryAsync( string name)
        {
            Category c = new Category();
            c.Name = name;
            dataContext.categories.Add(c);
            await dataContext.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
            Category c = dataContext.categories.Find(id);
            if (c != null)
            {
                dataContext.categories.Remove(c);
            }
            await dataContext.SaveChangesAsync();
        }
    }
}
