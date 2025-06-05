using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Data;
using Core;

namespace Data.Data
{
    public class SubCategoryData : ISubCategoryData
    {
        public readonly DataContext dataContext;

        public SubCategoryData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public IEnumerable<SubCategory> GetAll()
        {
            return dataContext.subcategories.ToList();
        }

        public SubCategory GetById(int id)
        {
            return dataContext.subcategories.FirstOrDefault(x => x.Id == id);
        }

        public SubCategory GetByName(string name)
        {
            return dataContext.subcategories.FirstOrDefault(x => x.Name == name);
        }

        public async Task UpdateSubCategoryAsync(int id, string name)
        {
            SubCategory c = dataContext.subcategories.FirstOrDefault(c => c.Id == id);
            if (c != null)
            {
                c.Name = name;
            }
            await dataContext.SaveChangesAsync();
        }
        public async Task AddSubCategoryAsync(string name)
        {
            SubCategory c = new SubCategory();
            c.Name = name;
            dataContext.subcategories.Add(c);
            await dataContext.SaveChangesAsync();
        }

        public async Task DeleteSubCategoryAsync(int id)
        {
            SubCategory c = dataContext.subcategories.Find(id);
            if (c != null)
            {
                dataContext.subcategories.Remove(c);
            }
            await dataContext.SaveChangesAsync();
        }
    }
}
