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
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryService subcategoryService;
        private readonly IMapper mapper;

        public SubCategoryController(ISubCategoryService _subcategoryService, IMapper _mapper)
        {
            subcategoryService = _subcategoryService;
            mapper = _mapper;
        }
        // GET: api/SubCategory
        [HttpGet]
        public IEnumerable<SubCategoryDTO> GetAll()
        {
            // = mapper.Map<IEnumerable<CategoryDTO>>(categoryService.GetAll());
            return mapper.Map<IEnumerable<SubCategoryDTO>>(subcategoryService.GetAll());
        }

        // GET api/SubCategory/5
        [HttpGet("{id:int}")]
        public SubCategory GetById(int id)
        {
            return mapper.Map<SubCategory>(subcategoryService.GetById(id));
        }

        // GET api/SubCategory/name/{name}
        [HttpGet("{name}")]
        public SubCategoryDTO GetByName(string name)
        {
            return mapper.Map<SubCategoryDTO>(subcategoryService.GetByName(name));
        }

        // POST api/SubCategory
        [Authorize]
        [HttpPost]
        public async Task Post([FromBody] string name)
        {
            await subcategoryService.AddSubCategoryAsync(name);
        }

        // PUT api/SubCategory/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] string name)
        {
            await subcategoryService.UpdateSubCategoryAsync(id, name);
        }

        // DELETE api/SubCategory/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await subcategoryService.DeleteSubCategoryAsync(id);
        }
    }
}
