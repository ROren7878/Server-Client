using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Data;
using Core;
using Core.Service;

namespace Service
{
    public class SubCategoryService : ISubCategoryService
    {
        public readonly ISubCategoryData subcategoryData;

        public SubCategoryService(ISubCategoryData _subCategoryData)
        {
            subcategoryData = _subCategoryData;
        }

        public IEnumerable<SubCategory> GetAll()
        {
            return subcategoryData.GetAll();
        }

        public SubCategory GetById(int id)
        {
            return subcategoryData.GetById(id);
        }

        public SubCategory GetByName(string name)
        {
            return subcategoryData.GetByName(name);
        }

        public async Task UpdateSubCategoryAsync(int id, string name)
        {
            await subcategoryData.UpdateSubCategoryAsync(id, name);
        }
        public async Task AddSubCategoryAsync(string name)
        {
            await subcategoryData.AddSubCategoryAsync(name);
        }

        public async Task DeleteSubCategoryAsync(int id)
        {
            await subcategoryData.DeleteSubCategoryAsync(id);
        }
    }
}
