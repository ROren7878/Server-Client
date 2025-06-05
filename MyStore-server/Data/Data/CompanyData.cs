using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;

namespace Data.Data
{
    public class CompanyData : ICompanyData
    {
        public readonly DataContext dataContext;

        public CompanyData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public IEnumerable<Company> GetAll()
        {
            return dataContext.companies.ToList();
        }

        public Company GetById(int id)
        {
            return dataContext.companies.FirstOrDefault(x => x.Id == id);
        }

        public Company GetByName(string name)
        {
            return dataContext.companies.FirstOrDefault(x => x.Name == name);
        }

        public async Task UpdateCompanyAsync(int id, string name)
        {
            Company c = dataContext.companies.FirstOrDefault(c => c.Id == id);
            if (c != null)
            {
                c.Name = name;
            }
            await dataContext.SaveChangesAsync();
        }

        public async Task AddCompanyAsync(string name)
        {
            Company c = new Company();
            c.Name = name;
            dataContext.companies.Add(c);
            await dataContext.SaveChangesAsync();
        }

        public async Task DeleteCompanyAsync(int id)
        {
            Company c = dataContext.companies.Find(id);
            if (c != null)
            {
                dataContext.companies.Remove(c);
            }
            await dataContext.SaveChangesAsync();
        }
    }
}
