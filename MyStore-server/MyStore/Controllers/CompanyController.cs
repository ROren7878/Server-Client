using AutoMapper;
using Core.DTO;
using Core.Service;
using Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService companyService;
        private readonly IMapper mapper;

        public CompanyController(ICompanyService _companyService, IMapper _mapper)
        {
            companyService = _companyService;
            mapper = _mapper;
        }
        // GET: api/Company
        [HttpGet]
        public IEnumerable<CompanyDTO> GetAll()
        {
            // = mapper.Map<IEnumerable<CategoryDTO>>(categoryService.GetAll());
            return mapper.Map<IEnumerable<CompanyDTO>>(companyService.GetAll());
        }

        // GET api/Company/5
        [HttpGet("{id:int}")]
        public Company GetById(int id)
        {
            return mapper.Map<Company>(companyService.GetById(id));
        }

        // GET api/Company/name/{name}
        [HttpGet("{name}")]
        public CompanyDTO GetByName(string name)
        {
            return mapper.Map<CompanyDTO>(companyService.GetByName(name));
        }

        // POST api/Company
        [Authorize]
        [HttpPost]
        public async Task Post([FromBody] string name)
        {
            await companyService.AddCompanyAsync(name);
        }

        // PUT api/Company/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] string name)
        {
            await companyService.UpdateCompanyAsync(id, name);
        }

        // DELETE api/Company/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await companyService.DeleteCompanyAsync(id);
        }
    }
}
