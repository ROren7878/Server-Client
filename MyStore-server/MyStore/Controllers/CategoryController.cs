using System.Collections.Generic;
using AutoMapper;
using Core;
using Core.DTO;
using Core.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;
        private readonly IMapper mapper;

        public CategoryController(ICategoryService _categoryService, IMapper _mapper)
        {
            categoryService = _categoryService;
            mapper = _mapper;
        }
        // GET: api/Category
        [HttpGet]
        public IEnumerable<CategoryDTO> GetAll()
        {
            // = mapper.Map<IEnumerable<CategoryDTO>>(categoryService.GetAll());
            return mapper.Map<IEnumerable<CategoryDTO>>(categoryService.GetAll()); 
        }

        // GET api/Category/5
        [HttpGet("{id:int}")]
        public Category GetById(int id)
        {
            return mapper.Map<Category>( categoryService.GetById(id));
        }

        // GET api/Category/name/{name}
        [HttpGet("{name}")]
        public CategoryDTO GetByName(string name)
        {
            return mapper.Map<CategoryDTO>(categoryService.GetByName(name));
        }

        // POST api/Category
        [Authorize]
        [HttpPost]
        public async Task Post([FromBody] string name)
        {
            await categoryService.AddCategoryAsync(name);    
        }

        // PUT api/Category/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task Put( int id, [FromBody] string name)
        {
            await categoryService.UpdateCategoryAsync(id, name);
        }

        // DELETE api/Category/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await categoryService.DeleteCategoryAsync(id);
        }
    }
}
