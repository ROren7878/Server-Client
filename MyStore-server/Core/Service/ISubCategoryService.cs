using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Service
{
    public interface ISubCategoryService
    {
        IEnumerable<SubCategory> GetAll();
        SubCategory GetById(int id);
        SubCategory GetByName(string name);
        Task AddSubCategoryAsync(string name);
        Task UpdateSubCategoryAsync(int id, string name);
        Task DeleteSubCategoryAsync(int id);
    }
}