using AutoMapper;
using Core;
using Core.DTO;
using Core.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrderController(IOrderService _orderService, IMapper _mapper)
        {
            orderService = _orderService;
            mapper = _mapper;
        }

        // GET: api/<OrderController>
        [Authorize]
        [HttpGet]
        public IEnumerable<OrderDTO> GetAll()
        {
            return mapper.Map<IEnumerable<OrderDTO>>(orderService.GetAll());
        }

        // GET: api/Order/5
        [HttpGet("{id:int}")]
        public OrderDTO GetById(int id)
        {
            return mapper.Map<OrderDTO>(orderService.GetById(id));
        }

        // GET: api/Order/date/{date}
        [HttpGet("date/{date}")]
        public IEnumerable<OrderDTO> GetByDate(DateTime date)
        {
            return mapper.Map<IEnumerable<OrderDTO>>(orderService.GetByDate(date));
        }

        // GET: api/Order/user/{userId}
        [HttpGet("user/{userId:int}")]
        public IEnumerable< OrderDTO> GetByUserId(int userId)
        {
            return mapper.Map<IEnumerable<OrderDTO>>(orderService.GetByUserId(userId));
        }

        // POST api/Order
        [HttpPost]
        public async Task Post([FromBody] OrderDTO order)
        {
            await orderService.AddOrderAsync(mapper.Map<Order>(order));
        }

    }
}
