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
    public class ProductController : ControllerBase
    {

        private readonly IProductService productService;
        private readonly IMapper mapper;

        public ProductController(IProductService _productService, IMapper _mapper)
        {
            productService = _productService;
            mapper = _mapper;   
        }

        // GET: api/Product
        [HttpGet]
        public IEnumerable<ProductDTO> GetAll()
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.GetAll());
        }

        // GET api/Product/id/5
        [HttpGet("id/{id:int}")]
        public ProductDTO GetById(int id)
        {
            return mapper.Map<ProductDTO>(productService.GetById(id));
        }

        // GET api/Product/name/{name}
        [HttpGet("name/{name}")]
        public ProductDTO GetByName(string name)
        {
            return mapper.Map<ProductDTO>(productService.GetByName(name));
        }

        // GET api/Product/category/{categoryName}
        [HttpGet("category/{categoryName}")]
        public IEnumerable<ProductDTO> GetByCategory(string categoryName)
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.GetByCategory(categoryName));
        }

        // GET api/Product/subCategory/{subCategoryId}
        [HttpGet("subCategory/{subCategoryName}")]
        public IEnumerable<ProductDTO> GetBySubCategory(string subCategoryName)
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.GetBySubCategory(subCategoryName));
        }

        // GET api/Product/company/{companyName}
        [HttpGet("company/{companyName}")]
        public IEnumerable<ProductDTO> GetByCompany(string companyName)
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.GetByCompany(companyName));
        }

        // GET api/noQuantity
        [Authorize]
        [HttpGet("noQuantity")]
        public IEnumerable<ProductDTO> NoQuantity()
        {
            return mapper.Map<IEnumerable<ProductDTO>>(productService.NoQuantity());
        }

        // POST api/Product
        [Authorize]
        [HttpPost]
        public async Task Post([FromBody] ProductDTO product)
        {
            await productService.AddProductAsync(mapper.Map<Product>(product));
        }

        // PUT api/Product/5
        [HttpPut("{id:int}")]
        public async Task Put([FromBody] ProductDTO product, int id)
        {
           await productService.UpdateProductAsync(mapper.Map<Product>(product), id);
        }

        // DELETE api/Product/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
           await productService.DeleteProductAsync(id);
        }
    }
}
