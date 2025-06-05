using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data
{
    public interface ICompanyData
    {
        IEnumerable<Company> GetAll();
        Company GetById(int id);
        Company GetByName(string name);
        Task AddCompanyAsync(string name);
        Task UpdateCompanyAsync(int id, string name);
        Task DeleteCompanyAsync(int id);
    }
}
