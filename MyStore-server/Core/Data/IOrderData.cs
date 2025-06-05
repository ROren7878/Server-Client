using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data
{
    public interface IOrderData
    {
        IEnumerable<Order> GetAll();
        Order GetById(int id);
        IEnumerable<Order> GetByUserId(int userId);
        IEnumerable<Order> GetByDate(DateTime date);
        Task AddOrderAsync(Order order);
    }
}
