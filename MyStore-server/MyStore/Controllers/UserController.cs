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
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IMapper mapper;

        public UserController(IUserService _userServise, IMapper _mapper)
        {
            userService = _userServise;
            mapper = _mapper;
        }

        // GET: api/User
        [Authorize]
        [HttpGet]
        public IEnumerable<UserDTO> GetAll()
        {
            return mapper.Map<IEnumerable<UserDTO>>(userService.GetAll());
        }

        // GET api/User/5
        [HttpGet("{id}")]
        public UserDTO GetById(int id)
        {
            return mapper.Map<UserDTO>(userService.GetById(id));
        }

        //GET /api/User/john/john @example.com
        [HttpGet("{username}/{email}")]
        public ActionResult<UserDTO> GetByUserNameEmail(string username, string email)
        {
            var user = mapper.Map<UserDTO>(userService.GetByUserNameEmail(username, email));
            if (user == null)
                return NotFound();  
            return Ok(user);
        }

        // POST api/User
        [HttpPost]
        public async Task Post([FromBody] UserDTO user)
        {
            await userService.AddUserAsync(mapper.Map<User>(user));
        }

        // PUT api/User/5
        [HttpPut("{id}")]
        public async Task Put([FromBody] UserDTO user, int id)
        {
            await userService.UpdateUserAsync(mapper.Map<User>(user), id);
        }

        // DELETE api/User/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await userService.DeleteUserAsync(id);
        }
    }
}
