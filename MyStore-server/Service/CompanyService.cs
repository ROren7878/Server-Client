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
    public class CompanyService : ICompanyService
    {
        public readonly ICompanyData companyData;

        public CompanyService(ICompanyData _companyData)
        {
            companyData = _companyData;
        }

        public IEnumerable<Company> GetAll()
        {
            return companyData.GetAll();
        }

        public Company GetById(int id)
        {
            return companyData.GetById(id);
        }

        public Company GetByName(string name)
        {
            return companyData.GetByName(name);
        }

        public async Task UpdateCompanyAsync(int id, string name)
        {
            await companyData.UpdateCompanyAsync(id, name);
        }

        public async Task AddCompanyAsync(string name)
        {
            await companyData.AddCompanyAsync(name);
        }

        public async Task DeleteCompanyAsync(int id)
        {
            await companyData.DeleteCompanyAsync(id);
        }
    }
}
